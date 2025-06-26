const { OpenAI } = require('openai');
const PromptResponse = require('../models/PromptResponse');
const dotenv = require('dotenv');
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 10000 // 10-second timeout
});

// POST /api/ask-ai
const askAI = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === '') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    console.log('Received prompt:', prompt);

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || 'No response from AI';
    console.log('OpenAI reply:', reply);

    // Save to MongoDB
    await PromptResponse.create({ prompt, response: reply });

    res.status(200).json({ response: reply });

  } catch (err) {
    console.error('OpenAI error:', err);

    // OpenAI-specific errors
    if (err.status === 401) {
      return res.status(401).json({ error: 'Invalid or missing OpenAI API key.' });
    }

    if (err.status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please wait and try again.' });
    }

    // Network / Timeout
    if (err.code === 'ETIMEDOUT' || err.message?.includes('timeout')) {
      return res.status(504).json({ error: 'Request to OpenAI timed out. Try again later.' });
    }

    // Fallback
    return res.status(500).json({ error: 'AI service failed. Please try again.' });
  }
};

// GET /api/conversations (or /api/history)
const getHistory = async (req, res) => {
  try {
    const history = await PromptResponse.find()
      .sort({ createdAt: -1 }) // newest first
      .limit(20);
    res.status(200).json(history);
  } catch (err) {
    console.error('History fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

// DELETE /api/conversations
const deleteConversations = async (req, res) => {
  try {
    await PromptResponse.deleteMany({});
    res.status(200).json({ message: 'All conversations deleted successfully.' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete conversations' });
  }
};

module.exports = {
  askAI,
  getHistory,
  deleteConversations
};
