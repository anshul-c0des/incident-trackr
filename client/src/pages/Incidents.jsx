import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchIncidents = async () => {
    try {
      const res = await axiosInstance.get('/incidents');
      setIncidents(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load incidents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Incidents</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/incidents/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Create Incident
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Logout
          </button>
        </div>
      </div>

      {loading && <p>Loading incidents...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {incidents.length === 0 && !loading && <p>No incidents found.</p>}

      <div className="space-y-4">
        {incidents.map((incident) => (
          <div key={incident.incidentId} className="border p-4 rounded shadow-sm">
            <h2 className="text-lg font-semibold">{incident.incidentId}</h2>
            <p>{incident.incidentDetails}</p>
            <p className="text-sm text-gray-600">
              Priority: <span className="font-medium">{incident.priority}</span> | Status:{' '}
              <span className="font-medium">{incident.status}</span>
            </p>
            <p className="text-sm text-gray-500">
              Reported: {new Date(incident.reportedAt).toLocaleString()}
            </p>
            <button
              onClick={() => navigate(`/incidents/${incident.incidentId}/edit`)}
              className="mt-2 text-blue-600 hover:underline"
              disabled={incident.status === 'Closed'}
            >
              {incident.status === 'Closed' ? 'Closed (View Only)' : 'Edit'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
