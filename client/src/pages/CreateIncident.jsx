import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

export default function CreateIncident() {
  const [incidentDetails, setIncidentDetails] = useState('');
  const [priority, setPriority] = useState('Low');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axiosInstance.post('/incidents', {
        incidentDetails,
        priority,
      });

      navigate('/incidents'); // redirect after success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create incident');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create New Incident</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Incident Details</label>
          <textarea
            rows="4"
            value={incidentDetails}
            onChange={(e) => setIncidentDetails(e.target.value)}
            required
            className="w-full p-2 border rounded"
            placeholder="Describe the incident..."
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Submitting...' : 'Submit Incident'}
        </button>
      </form>
    </div>
  );
}
