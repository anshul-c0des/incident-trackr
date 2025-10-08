import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BarLoader } from "react-spinners";
import { CircleFadingPlus, LogOut } from "lucide-react";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);   // stores fetched incidents
  const [loading, setLoading] = useState(true);   // loading state
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({   // stores current filter selection
    status: "",
    priority: "",
  });
  const navigate = useNavigate();

  const fetchIncidents = async () => {   // fetches incidents
    try {
      const res = await axiosInstance.get("/incidents");
      setIncidents(res.data);
    } catch (err) {
      toast.error("Failed to load incidents!");
      setError(err.response?.data?.message || "Failed to load incidents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {   // fetches on mount
    fetchIncidents();
  }, []);

  const handleLogout = () => {   // handles logout - clear saved token
    localStorage.removeItem("token");
    toast.success("Logout successful");
    navigate("/login");
  };

  const handleFilterChange = (e) => {   // updates filters on dropdown changes
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredIncidents = incidents.filter((incident) => {   // filters incidents (client-side)
    return (
      (filters.status ? incident.status === filters.status : true) &&
      (filters.priority ? incident.priority === filters.priority : true)
    );
  });

  return (
    <div className="bg-gray-50 h-100vh">
      <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-md shadow h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600 ml-2">
            My Incidents
          </h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/incidents/new")}
              className="bg-white text-blue-500 border-2 border-blue-500 px-3 py-1.5 rounded-lg hover:bg-blue-500 hover:text-white font-semibold"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="hidden lg:block md:block">
                  Create Incident
                </span>
                <CircleFadingPlus />
              </div>
            </button>
            <button
              onClick={handleLogout}
              className="bg-white text-red-500 border-2 border-red-500 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white font-semibold"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="hidden lg:block md:block">Logout</span>
                <LogOut />
              </div>
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="flex justify-center">
          {loading && <BarLoader width="80%" color="#3B82F6" />}
        </div>
        {error && <p className="text-red-600">{error}</p>}

        {filteredIncidents.length === 0 && !loading && (
          <p>No incidents found.</p>
        )}

        <div className="flex flex-col gap-4 overflow-y-auto max-h-screen mb-2">
          {filteredIncidents.map((incident) => (
            <div
              key={incident.incidentId}
              className="border p-4 rounded-lg shadow-sm bg-blue-50/60 hover:bg-blue-50/80 flex flex-col sm:flex-row sm:justify-between sm:items-start hover:shadow-md"
            >
              <div className="flex flex-col sm:w-2/3">
                <h2 className="text-lg font-semibold">{incident.incidentId}</h2>
                <p className="text-md font-semibold text-gray-600">
                  Reporter: {incident.reporter.name}
                </p>
                <p className="text-md font-semibold text-gray-600">
                  Details: {incident.incidentDetails}
                </p>
                <p className="text-sm text-gray-500">
                  Reported: {new Date(incident.reportedAt).toLocaleString()}
                </p>
                {incident.reportedAt !== incident.updatedAt && (
                  <p className="text-sm text-gray-500">
                    Last Updated:{" "}
                    {new Date(incident.updatedAt).toLocaleString()}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:w-1/3 mt-4 sm:mt-0 sm:items-end space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">Priority:</span>
                  <div
                    className={`px-3 py-1 text-white rounded-full text-xs font-semibold ${
                      incident.priority === "High"
                        ? "bg-red-600"
                        : incident.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {incident.priority}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">Status:</span>
                  <div
                    className={`px-3 py-1 text-white rounded-full text-xs font-semibold ${
                      incident.status === "Open"
                        ? "bg-cyan-500"
                        : incident.status === "In Progress"
                        ? "bg-blue-600"
                        : "bg-gray-600"
                    }`}
                  >
                    {incident.status}
                  </div>
                </div>

                <div className="mt-4 sm:mt-auto">
                  <button
                    onClick={() =>
                      navigate(`/incidents/${incident.incidentId}/edit`)
                    }
                    className="text-blue-600 hover:underline font-semibold"
                    disabled={incident.status === "Closed"}   // disables button if status === closed
                  >
                    {incident.status === "Closed"   // incident cannot be edited id it is closed
                      ? "Closed (View Only)"
                      : "Edit"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
