import './index.css'
import { useState } from 'react'
import axios from 'axios'
import Header from './components/header'
import Footer from './components/footer'
import PromptForm from './components/PromptForm'
import HistoryList from './components/HistoryList';

function App() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!prompt.trim()) {
      alert('Please enter a prompt')
      return
    }

    setLoading(true)

    try {
      const res = await axios.post('http://localhost:5000/api/ask-ai', { prompt })
      setResponse(res.data.response)
    } catch (err) {
      console.error(err)
      if (err.response?.status === 429) {
        const retryAfter = err.response.headers['retry-after'];
        if (retryAfter) {
          console.log(`Rate limit reset in ${retryAfter} seconds.`);
        } else {
          console.log('Rate limited but no retry-after header present.');
        }} else {
        setResponse('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4">
        <PromptForm
          prompt={prompt}
          setPrompt={setPrompt}
          handleSubmit={handleSubmit}
          response={response}
          loading={loading}
        />
        <HistoryList />
      </main>

      <Footer />
    </div>
  );
}

export default App
