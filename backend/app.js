require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const aiRoutes = require('./routes/aiRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

const app = express();
console.log('Loaded Environment Variables:');
console.log("OpenAI API Key: ");
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
/*app.post('/api/ask', async (req, res) => {
    const { prompt } = req.body
  
    console.log('Prompt received:', prompt)
    res.json({ response: `You sent: ${prompt}` })
})*/
app.use('/api', aiRoutes);
app.use('/api', conversationRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log(typeof aiRoutes);
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Loaded' : 'Missing');
