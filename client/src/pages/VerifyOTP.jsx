import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ShieldQuestionMark, Loader2 } from 'lucide-react';

export default function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_BASE_URL;

  const email = localStorage.getItem('resetEmail');

  useEffect(() => {
    if (!email) {
      setError('No email found for password reset');
      return;
    }

    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setIsResendDisabled(false);
    }

    return () => clearInterval(interval);
  }, [timer, email]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const loadingToast = toast.loading('Verifying OTP...');

    try {
      await axios.post(`${API}/auth/verify-otp`, { email, otp });
      setMessage('OTP verified successfully!');
      toast.success('OTP verified successfully!', { id: loadingToast });
      navigate('/reset-password');
    } catch (err) {
      toast.error('OTP Verification Failed.', { id: loadingToast });
      setError(err.response?.data?.message || 'OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setMessage('');
    setIsResendDisabled(true);
    setResendLoading(true);

    try {
      await axios.post(`${API}/auth/send-otp`, { email });
      toast.success('OTP resent.');
      setTimer(60);
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
      toast.error('Failed to resend OTP.');
      setIsResendDisabled(false);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 h-100vh">
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow bg-white">
        <h1 className="text-3xl font-bold mb-4 text-green-500 text-center">Verify OTP</h1>
        <p className="mb-2 text-gray-700">OTP sent to <strong>{email}</strong></p>
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
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <div className="flex justify-center items-center gap-2 font-semibold">
              {loading ? 'Verifying OTP...' : 'Verify OTP'}
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <ShieldQuestionMark />
              )}
            </div>
          </button>
        </form>

        <div className="mt-4 text-center">
          {timer > 0 ? (
            <p className="text-gray-500">Resend OTP in {timer}s</p>
          ) : (
            <button
              onClick={handleResend}
              className="text-blue-600 underline"
              disabled={isResendDisabled || resendLoading}
            >
              {resendLoading ? (
                <Loader2 className="animate-spin w-5 h-5 inline-block mr-2" />
              ) : null}
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
