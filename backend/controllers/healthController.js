const axios = require('axios');
const HealthRecord = require('../models/HealthRecord');

exports.submitHealthData = async (req, res) => {
  try {
    const { diseaseType, inputData } = req.body;

    if (!diseaseType || !inputData) {
      return res.status(400).json({ error: 'diseaseType and inputData are required' });
    }

    if (!['diabetes', 'heart'].includes(diseaseType)) {
      return res.status(400).json({ error: 'diseaseType must be "diabetes" or "heart"' });
    }

    // Call the Flask API
    const flaskUrl = `${process.env.FLASK_API_URL}/predict/${diseaseType}`;
    const flaskResponse = await axios.post(flaskUrl, inputData);

    const { prediction, probability, category } = flaskResponse.data;

    // Save the result linked to the logged-in user
    const record = new HealthRecord({
      userId: req.userId,
      diseaseType,
      inputData,
      prediction,
      probability,
      category,
    });
    await record.save();

    res.status(201).json({
      message: 'Prediction saved successfully',
      result: { prediction, probability, category },
    });
  } catch (err) {
    if (err.response) {
      // Flask returned an error (e.g., validation failure)
      return res.status(err.response.status).json({ error: err.response.data.error || 'Flask API error' });
    }
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const records = await HealthRecord.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ history: records });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};