const express = require('express');
const { askAI, getHistory } = require('../controllers/aiController');

const router = express.Router()

router.post('/ask-ai', askAI)
router.get('/history', getHistory);

module.exports = router;