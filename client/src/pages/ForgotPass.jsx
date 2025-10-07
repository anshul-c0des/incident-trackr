import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2, Send } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false); 
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSending(true);

    try {
      await axios.post(`${API}/auth/send-otp`, { email });
      setMessage('OTP sent to your email.');
      localStorage.setItem('resetEmail', email);
      toast.success("OTP Sent.")
      navigate('/verify-otp');
    } catch (err) {
      toast.error("Failed to send OTP.")
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally{
      setSending(false);
    }
  };

  return (
    <div className="bg-gray-50">
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow text-center bg-white">
      <h1 className="text-2xl font-bold mb-4 text-blue-400">Forgot Password</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          <div className="flex justify-center items-center gap-2 font-semibold">
              {sending ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <Send />
              )}
              {sending ? 'Sending OTP...' : 'Send OTP'}
            </div>
        </button>
      </form>
    </div>
    </div>
  );
}
