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

const trackedTrains = new Map();

app.post('/api/track-train', (req, res) => {
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

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: 'From and To stations are required',
      });
    }

    const response = await fetch(
      `https://api.railradar.in/v1/trains/between/${encodeURIComponent(from)}/${encodeURIComponent(to)}`,
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