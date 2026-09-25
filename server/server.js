const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Find My Train API is running',
  });
});
app.post('/api/push-token', (req, res) => {
  const { token } = req.body;

  console.log('PUSH TOKEN RECEIVED:', token);

  res.json({
    success: true,
    message: 'Push token received',
  });
});

async function sendExpoNotification(pushToken, title, body, data = {}) {
  try {
    const response = await fetch(
      'https://exp.host/--/api/v2/push/send',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: pushToken,
          title,
          body,
          data,
        }),
      }
    );

    const result = await response.json();

    console.log('EXPO PUSH RESULT:', JSON.stringify(result, null, 2));

    return result;
  } catch (error) {
    console.error('EXPO PUSH ERROR:', error);
    return null;
  }
}

const trackedTrains = new Map();

app.post('/api/track-train', async (req, res) => {
  console.log('TRACK REQUEST RECEIVED:', req.body);

  const {
    trainNumber,
    startStationCode,
    startStationName,
    pushToken,
  } = req.body;

  if (!trainNumber || !startStationCode || !pushToken) {
    console.log('TRACK REQUEST MISSING DATA:', {
      trainNumber,
      startStationCode,
      startStationName,
      pushToken,
    });

    return res.status(400).json({
      success: false,
      message: 'trainNumber, startStationCode and pushToken are required',
    });
  }

 await pool.query(
  `
  INSERT INTO tracked_trains
    (
      train_number,
      start_station_code,
      start_station_name,
      push_token,
      active
    )
  VALUES ($1, $2, $3, $4, TRUE)
  `,
  [
    String(trainNumber),
    startStationCode,
    startStationName,
    pushToken,
  ]
);

  console.log('TRACKING STARTED:', {
    trainNumber,
    startStationCode,
    startStationName,
  });

  await sendExpoNotification(
  pushToken,
  '🚆 Train Tracking Started',
  `We are now tracking train ${trainNumber} for ${startStationName}.`,
  {
    trainNumber,
    startStationCode,
  }
);

  return res.json({
    success: true,
    message: 'Train tracking started',
  });
});


app.get('/api/train/:number/live', async (req, res) => {
  try {
    const { number } = req.params;

    const response = await fetch(
      `https://api.railradar.in/v1/trains/${number}/live`,
      {
        headers: {
          Authorization: `Bearer ${process.env.RAILRADAR_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch live train data',
    });
  }
});

app.get('/api/trains/search', async (req, res) => {
  try {
    const { from, to } = req.query;

    console.log('TRAIN SEARCH REQUEST:', { from, to });

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: 'From and To stations are required',
      });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(
        `https://api.railradar.in/v1/trains/between/${encodeURIComponent(from)}/${encodeURIComponent(to)}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.RAILRADAR_API_KEY}`,
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeout);

      const data = await response.json();

      console.log('RAILRADAR SEARCH STATUS:', response.status);

      return res.status(response.status).json(data);
    } catch (error) {
      clearTimeout(timeout);

      console.error('RAILRADAR SEARCH ERROR:', error);

      return res.status(504).json({
        success: false,
        message: 'Train search request timed out or failed',
      });
    }
  } catch (error) {
    console.error('TRAIN SEARCH SERVER ERROR:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to search trains',
    });
  }
});

app.get('/api/stations/search', async (req, res) => {
  try {
    const { q } = req.query;

    const searchQuery =
  q.toLowerCase() === 'kollam' ? 'Quilon' : q;

    if (!q) {
      return res.json({
        success: true,
        data: [],
      });
    }

    const response = await fetch(
      `https://api.railradar.in/v1/lookup/search/stations?q=${encodeURIComponent(searchQuery)}&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${process.env.RAILRADAR_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error('Station search failed:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to search stations',
    });
  }
});

async function checkTrackedTrains() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        train_number,
        start_station_code,
        start_station_name,
        push_token,
        last_station_code
      FROM tracked_trains
      WHERE active = TRUE
    `);

    console.log(
      `CHECKING ${result.rows.length} ACTIVE TRAIN TRACKING RECORD(S)`
    );

    for (const tracking of result.rows) {
      try {
        const response = await fetch(
          `https://api.railradar.in/v1/trains/${encodeURIComponent(
            tracking.train_number
          )}/live`,
          {
            headers: {
              Authorization: `Bearer ${process.env.RAILRADAR_API_KEY}`,
            },
          }
        );

        if (!response.ok) {
          console.error(
            `LIVE API FAILED FOR TRAIN ${tracking.train_number}:`,
            response.status
          );
          continue;
        }

        const apiResult = await response.json();
        const liveTrain = apiResult.data ?? apiResult;

        const currentStation =
          liveTrain.currentLocation?.stationCode;

        const currentStationName =
          liveTrain.currentLocation?.stationName;

        const nextStationName =
          liveTrain.nextHalt?.stationName;

        if (!currentStation) {
          console.log(
            `NO CURRENT STATION FOR TRAIN ${tracking.train_number}`
          );
          continue;
        }

        console.log(
          `TRAIN ${tracking.train_number}: CURRENT=${currentStation}`
        );

        // First check: remember the current station without sending
        // a duplicate notification for the station where tracking began.
        if (!tracking.last_station_code) {
          await pool.query(
            `
            UPDATE tracked_trains
            SET last_station_code = $1
            WHERE id = $2
            `,
            [currentStation, tracking.id]
          );

          // If the train is already at the user's boarding station,
          // finish tracking immediately.
          if (currentStation === tracking.start_station_code) {
            await sendExpoNotification(
              tracking.push_token,
              '🚆 Your boarding station has been reached',
              `Train ${tracking.train_number} has reached ${tracking.start_station_name}.`,
              {
                trainNumber: tracking.train_number,
                stationCode: currentStation,
              }
            );

            await pool.query(
              `
              UPDATE tracked_trains
              SET active = FALSE
              WHERE id = $1
              `,
              [tracking.id]
            );
          }

          continue;
        }

        // No station change.
        if (currentStation === tracking.last_station_code) {
          continue;
        }

      

       // New station reached.
if (currentStation === tracking.start_station_code) {
  const boardingPushResult = await sendExpoNotification(
    tracking.push_token,
    '📍 Your boarding station has been reached',
    `Train ${tracking.train_number} has reached ${tracking.start_station_name}. Your journey can begin.`,
    {
      trainNumber: tracking.train_number,
      stationCode: currentStation,
    }
  );

  const boardingPushAccepted =
    boardingPushResult?.data?.status === 'ok';

  if (boardingPushAccepted) {
    await pool.query(
      `
      UPDATE tracked_trains
      SET last_station_code = $1,
          active = FALSE
      WHERE id = $2
      `,
      [currentStation, tracking.id]
    );

    console.log(
      `TRACKING COMPLETED FOR TRAIN ${tracking.train_number}`
    );
  }

  continue;
}

const stationPushResult = await sendExpoNotification(
  tracking.push_token,
  `🚆 Train reached ${currentStationName || currentStation}`,
  `Train ${tracking.train_number} has reached ${
    currentStationName || currentStation
  }.${
    nextStationName
      ? ` Next station: ${nextStationName}.`
      : ''
  }`,
  {
    trainNumber: tracking.train_number,
    stationCode: currentStation,
  }
);

const stationPushAccepted =
  stationPushResult?.data?.status === 'ok';

if (stationPushAccepted) {
  await pool.query(
    `
    UPDATE tracked_trains
    SET last_station_code = $1
    WHERE id = $2
    `,
    [currentStation, tracking.id]
  );
}

         
      } catch (error) {
        console.error(
          `CHECK FAILED FOR TRAIN ${tracking.train_number}:`,
          error
        );
      }
    }
  } catch (error) {
    console.error('TRACKED TRAIN CHECKER ERROR:', error);
  }
}

app.get('/api/cron/check-trains', async (req, res) => {
  try {
    const cronSecret = req.headers['x-cron-secret'];

    if (!cronSecret || cronSecret !== process.env.CRON_SECRET) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    await checkTrackedTrains();

    return res.json({
      success: true,
      message: 'Tracked trains checked',
    });
  } catch (error) {
    console.error('CRON CHECK ERROR:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to check tracked trains',
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});