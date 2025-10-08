import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { CircleFadingPlus, Loader2 } from "lucide-react";

export default function CreateIncident() {
  const [incidentDetails, setIncidentDetails] = useState("");   // stores description
  const [priority, setPriority] = useState("Low");   // stores selected priority
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);   // loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {   // handles creating an incident
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/incidents", {
        incidentDetails,
        priority,
      });
      toast.success("Incident created successfully");

      navigate("/incidents");
    } catch (err) {
      toast.error("Failed to create instance");
      setError(err.response?.data?.message || "Failed to create incident");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 h-100vh">
      <div className="max-w-xl mx-auto mt-10 p-6 border rounded-md bg-white shadow">
        <h1 className="text-3xl text-blue-400 font-bold mb-4 text-center">
          Create New Incident
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Incident Details</label>
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
            <label className="block font-medium mb-1">Priority</label>
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
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Creating...
              </>
            ) : (
              <div className="flex items-center justify-center gap-2 font-semibold">
                Create Incident
                <CircleFadingPlus className="w-5 h-5" />
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
