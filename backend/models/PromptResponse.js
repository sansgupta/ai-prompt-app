const mongoose = require('mongoose');

const promptResponseSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PromptResponse = mongoose.model('PromptResponse', promptResponseSchema);

module.exports = PromptResponse;
