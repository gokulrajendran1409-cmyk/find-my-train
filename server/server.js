const express = require('express');
const cors = require('cors');
require('dotenv').config();

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

  trackedTrains.set(`${pushToken}:${trainNumber}`, {
    trainNumber: String(trainNumber),
    startStationCode,
    startStationName,
    pushToken,
    lastStationCode: null,
    active: true,
  });

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});