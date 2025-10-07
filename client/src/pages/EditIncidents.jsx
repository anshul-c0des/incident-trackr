import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

export default function EditIncident() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [incident, setIncident] = useState(null);
  const [formData, setFormData] = useState({
    incidentDetails: '',
    priority: 'Low',
    status: 'Open',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const res = await axiosInstance.get(`/incidents/${id}`);
        setIncident(res.data);
        setFormData({
          incidentDetails: res.data.incidentDetails,
          priority: res.data.priority,
          status: res.data.status,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch incident');
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axiosInstance.put(`/incidents/${id}`, formData);
      navigate('/incidents');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update incident');
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  const isClosed = incident.status === 'Closed';

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Incident: {incident.incidentId}</h1>

      {isClosed && (
        <p className="mb-4 text-red-500 font-semibold">
          This incident is closed and cannot be edited.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Incident Details</label>
          <textarea
            name="incidentDetails"
            rows="4"
            value={formData.incidentDetails}
            onChange={handleChange}
            disabled={isClosed}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            disabled={isClosed}
            className="w-full p-2 border rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={isClosed}
            className="w-full p-2 border rounded"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>
        </div>

        {!isClosed && (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Incident
          </button>
        )}
      </form>
    </div>
  );
}
