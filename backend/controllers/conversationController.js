const Conversation = require('../models/Conversation');
const PromptResponse = require('../models/PromptResponse');

const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find()
      .sort({ createdAt: -1 })  // newest first
      .limit(50);               // limit to last 50 records

    res.status(200).json(conversations);
  } catch (error) {
    console.error('Failed to get conversations:', error);
    res.status(500).json({ error: 'Failed to fetch conversation history' });
  }
};

const deleteConversations = async (req, res) => {
    try {
      await PromptResponse.deleteMany({});
      res.status(200).json({ message: 'All conversations cleared' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to clear conversations' });
    }
};

module.exports = { getConversations, deleteConversations };
