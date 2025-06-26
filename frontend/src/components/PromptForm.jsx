import React from 'react'

function PromptForm({ prompt, setPrompt, handleSubmit, response, loading }) {
  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Prompt Form</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
        >
          {loading ? 'Generating...' : 'Submit'}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-gray-50 border rounded-lg text-gray-800 whitespace-pre-wrap">
          <h2 className="font-semibold text-lg mb-2 text-gray-700">AI Response:</h2>
          {response}
        </div>
      )}
    </div>
  )
}

export default PromptForm
