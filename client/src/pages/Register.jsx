import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
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
        name="city"
        placeholder="City"
        value={formData.city}
        readOnly
        className="w-full p-2 border rounded bg-gray-100"
        />

        <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        readOnly
        className="w-full p-2 border rounded bg-gray-100"
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
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
