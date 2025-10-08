import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';
import { Loader2, Pencil } from 'lucide-react';

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
  const [updating, setUpdating] = useState(false); 
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
        toast.error("Failed to fetch incident");
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
    setUpdating(true);

    try {
      await axiosInstance.put(`/incidents/${id}`, formData);
      toast.success("Incident Updated Successfully");
      navigate('/incidents');
    } catch (err) {
      toast.error('Failed to update incident');
      setError(err.response?.data?.message || 'Failed to update incident');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  const isClosed = incident.status === 'Closed';

  return (
    <div className="bg-gray-50 h-100vh">
      <div className="max-w-xl mx-auto mt-10 p-6 border rounded-md shadow bg-white">
        <h1 className="text-3xl font-bold mb-4 text-blue-400 text-center">Edit Incident: {incident.incidentId}</h1>

        {isClosed && (
          <p className="mb-4 text-red-500 font-semibold">
            This incident is closed and cannot be edited.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Incident Details</label>
            <textarea
              name="incidentDetails"
              rows="4"
              value={formData.incidentDetails}
              onChange={handleChange}
              disabled={isClosed || updating}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              disabled={isClosed || updating}
              className="w-full p-2 border rounded"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={isClosed || updating}
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
            disabled={updating}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {updating ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Updating...
              </>
            ) : (
              <div className='flex items-center justify-center gap-2 font-semibold' >
                Update Incident
                <Pencil className="w-5 h-5" />
              </div>
            )}
          </button>
          )}
        </form>
      </div>
    </div>
  );
}
