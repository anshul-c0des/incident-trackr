import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, LogIn } from 'lucide-react';

export default function Register() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
    city: '',
    country: '',
    password: '',
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = async e => {
    const { name, value } = e.target;
  
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'pincode' && value.length === 6) {
      try {
        const res = await axios.get(`${apiBaseUrl}/fetchPincode/location-from-pincode/${value}`);
        const { city, country } = res.data;
  
        setFormData(prev => ({
          ...prev,
          city,
          country,
        }));
      } catch (err) {
        console.error('Failed to fetch city/country:', err);
        setFormData(prev => ({
          ...prev,
          city: 'Unknown',
          country: 'Unknown',
        }));
      }
    }
  
    if (name === 'pincode' && value.length < 6) {
      setFormData(prev => ({
        ...prev,
        city: '',
        country: '',
      }));
    }
  };
  

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${apiBaseUrl}/users/register`, formData);
      alert(res.data.message || 'Registration successful');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 h-100vh">
    <div className="max-w-md mx-auto mt-3 px-6 py-3 border rounded-lg shadow bg-white">
      <h1 className="text-3xl text-blue-600 font-bold mb-4 text-center">Register</h1>
      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
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
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
        type="text"
        name="city"
        placeholder="City (Autofill)"
        value={formData.city}
        readOnly
        className="w-full p-2 border rounded bg-gray-100"
        />
        <input
        type="text"
        name="country"
        placeholder="Country (Autofill)"
        value={formData.country}
        readOnly
        className="w-full p-2 border rounded bg-gray-100"
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
              Registering...
            </>
          ) : ( 
            <div className='flex items-center justify-center gap-2 font-semibold' >
              Register
              <LogIn className="w-5 h-5" />
            </div>
          )}
        </button>
      </form>
      <div className='text-md mt-5 font-semibold text-center'>
        Already a User? <Link to="/login" className="text-blue-600 hover:underline font-bold"> LogIn </Link>
      </div>
    </div>
    </div>
  );
}
