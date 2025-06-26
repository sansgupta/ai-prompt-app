const express = require('express');
const router = express.Router();
const { getConversations, deleteConversations } = require('../controllers/conversationController');

router.get('/conversations', getConversations);
router.delete('/conversations', deleteConversations);

module.exports = router;
