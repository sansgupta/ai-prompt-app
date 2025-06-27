import React from 'react';
import { motion } from 'framer-motion';

function PromptForm({ prompt, setPrompt, handleSubmit, response, loading }) {
  return (
    <motion.div
      className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-3xl font-bold text-indigo-700 mb-4"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Prompt Form
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.input
          type="text"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          whileFocus={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />

        <motion.button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.03 }}
        >
          {loading ? 'Generating...' : 'Submit'}
        </motion.button>
      </form>

      {response && (
        <motion.div
          className="mt-6 p-4 bg-gray-50 border rounded-lg text-gray-800 whitespace-pre-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-semibold text-lg mb-2 text-gray-700">AI Response:</h2>
          {response}
        </motion.div>
      )}
    </motion.div>
  );
}

export default PromptForm;
