import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Incident Management System</h1>
      <div className="space-x-4">
        <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </div>
    </div>
  );
}
