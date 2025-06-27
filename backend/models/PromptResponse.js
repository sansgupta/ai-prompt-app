const mongoose = require('mongoose');

const promptResponseSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
    trim: true,
  },
  response: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modelUsed: {
    type: String,
    default: 'gpt-3.5-turbo',
  },
  tags: {
    type: [String],
    default: [],
  },
},
{
  timestamps: true // adds createdAt and updatedAt automatically
}
);

const PromptResponse = mongoose.model('PromptResponse', promptResponseSchema);

module.exports = PromptResponse;
