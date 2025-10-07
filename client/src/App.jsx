import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-10 p-4 bg-gray-50">
      <div className="text-center max-w-xl w-full">
        <h1 className="text-5xl font-bold mb-4 text-blue-600">Incident Trackr</h1>
        
        <p className="text-gray-600 mb-8 text-lg">
          <div className="flex items-center justify-center gap-1">
            Track, manage, and resolve incidents with clarity and speed.
            <Zap size={24} className="text-orange-500" />
          </div>
        </p>

        <img
          src="../public/hero.png"
          alt="Incident management"
          className="mx-auto mb-8 w-full max-w-md"
        />

        <div className="flex flex-col items-center gap-4">
          <Link
            to="/login"
            className="group w-64 text-center flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-600 hover:text-white font-semibold transition"
          >
            Login
            <ArrowRight
              size={20}
              className="transform transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            to="/register"
            className="group w-64 text-center flex items-center justify-center gap-2 bg-blue-500 border border-blue-600 text-white px-6 py-2 rounded hover:bg-blue-50 hover:text-blue-500 font-semibold transition"
          >
            Get Started
            <ArrowRight
              size={20}
              className="transform transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
