import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_BASE_URL;
  const email = localStorage.getItem('resetEmail');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await axios.post(`${API}/auth/verify-otp`, { email, otp });
      setMessage('OTP verified');
      navigate('/reset-password');
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
    }
  };

  const handleResend = async () => {
    try {
      await axios.post(`${API}/auth/send-otp`, { email });
      setMessage('OTP resent');
    } catch (err) {
      setError('Failed to resend OTP');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Verify OTP
        </button>
      </form>

      <button
        onClick={handleResend}
        className="mt-4 text-blue-600 underline"
      >
        Resend OTP
      </button>
    </div>
  );
}
