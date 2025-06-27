import './index.css';
import { useState } from 'react';
import axios from 'axios';
import Header from './components/header';
import Footer from './components/footer';
import PromptForm from './components/PromptForm';
import HistoryList from './components/HistoryList';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/ask-ai', { prompt });
      setResponse(res.data.response);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 429) {
        const retryAfter = err.response.headers['retry-after'];
        if (retryAfter) {
          console.log(`Rate limit reset in ${retryAfter} seconds.`);
        } else {
          console.log('Rate limited but no retry-after header present.');
        }
      } else if (err.response?.status === 401) {
        setResponse('Unauthorized: Invalid or missing API key.');
      } else {
        setResponse('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-screen flex flex-col bg-gradient-to-tr from-indigo-100  via-white to-indigo-200">
      <Header />

      <main className="flex-grow p-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            handleSubmit={handleSubmit}
            response={response}
            loading={loading}
          />
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 overflow-y-auto h-full hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Conversation History</h2>
          <HistoryList />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
