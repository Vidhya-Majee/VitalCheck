const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { submitHealthData, getHistory } = require('../controllers/healthController');

router.post('/submit', verifyToken, submitHealthData);
router.get('/history', verifyToken, getHistory);

module.exports = router;