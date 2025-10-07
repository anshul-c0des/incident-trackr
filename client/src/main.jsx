import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Incidents from './pages/Incidents.jsx'; 
import PrivateRoute from './components/PrivateRoute.jsx';
import CreateIncident from './pages/CreateIncident.jsx';
import EditIncident from './pages/EditIncidents.jsx';
import VerifyOtp from './pages/VerifyOTP.jsx';
import ForgotPassword from './pages/ForgotPass.jsx';
import ResetPassword from './pages/ResetPass.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/incidents"
          element={
            <PrivateRoute>
              <Incidents />
            </PrivateRoute>
          }
        />
        <Route
          path="/incidents/new"
          element={
            <PrivateRoute>
              <CreateIncident />
            </PrivateRoute>
          }
        />
        <Route
          path="/incidents/:id/edit"
          element={
            <PrivateRoute>
              <EditIncident />
            </PrivateRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
