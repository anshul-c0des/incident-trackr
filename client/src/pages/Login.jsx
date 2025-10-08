import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });   // stores user input for emial and pass
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);   // loading state

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {   // updates formdata when user types
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const trimmedData = {   // trims of extra spaces
        email: formData.email.trim(),
        password: formData.password,
      };
      const res = await axios.post(`${API}/auth/login`, trimmedData);
      const { token } = res.data;

      localStorage.setItem("token", token);
      toast.success("Logged in successfuly!");
      navigate("/incidents");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error("Login Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
          Login
        </h1>
        {error && <p className="mb-4 text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Logging in...
              </>
            ) : (
              <div className="flex items-center justify-center gap-2 font-semibold">
                Login
                <LogIn className="w-5 h-5" />
              </div>
            )}
          </button>
        </form>

        <div className="mt-4 text-right mr-2 font-medium">
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline text-sm"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="text-md mt-5 font-semibold text-center">
          New User?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-bold"
          >
            {" "}
            Register{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
