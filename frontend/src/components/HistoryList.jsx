import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HistoryList() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('http://localhost:5000/api/history');
        setHistory(res.data);
      } catch (err) {
        setError('No history');
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (loading) return <p>Loading history...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Prompt & Response History</h2>
      {history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <ul>
          {history.map(({ _id, prompt, response, createdAt }) => (
            <li key={_id} className="mb-4 border-b pb-2">
              <p><strong>Prompt:</strong> {prompt}</p>
              <p><strong>Response:</strong> {response}</p>
              <small className="text-gray-500">
                {new Date(createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
