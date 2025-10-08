# 🚨 Incident Trackr

A full-stack web application to manage and track incidents. The app features secure authentication, user-specific incident management, status filtering, and auto-location detection via pincode. Responsive, fast, and feature-complete.

---

## 🚀 Tech Stack
- **Frontend:** React (with Vite), Tailwind CSS
- **Backend/API:** Node.js, Express.js, Mongoose
- **Database:** MongoDB
- **Auth:** JWT, Bcrypt, Nodemailer (email-based password reset)
- **Icons & UI:** Lucide React, React Spinners, React Hot Toast
- **Other Tools:** Axios, Dotenv, CORS, Zippotamus API (auto fetching city from pincode)


---

## 📁 Pages Overview

### 1. `/register` – User Registration
- 🔐 Public Page
- Fields: Name, Email, Phone, Address, Pincode (→ auto-fetch City & Country)
- Validations in place
- Password hashing via bcrypt
- Auto-location populated via Zippopotamus API

### 2. `/login` – User Login
- 🔐 Public Page
- Email/password login
- JWT-based session handling
- Stores token securely in localStorage

### 3. `/forgot-password` – OTP-Based Reset
- Sends a one-time 6-digit OTP to user's registered email
- User gets redirected to set password if OTP is verified

### 4. `/incidents` – Incident Dashboard
- 🛡️ Protected Route – Login Required
- Lists all incidents created by the logged-in user
- Filters by Priority (High/Medium/Low) and Status (Open/In Progress/Closed)
- Fully responsive design

### 5. `/incidents/new` – Create Incident
- 🛡️ Protected Route – Login Required
- Fields: Incident Details, Priority, Status
- Auto-generates Incident ID in format: FW#####2025
- Reporter info auto-filled from user session

### 6. `/incidents/:id/edit` – Edit Incident
- 🛡️ Protected Route – Login Required
- Only allows editing if status ≠ Closed
- User can only edit their own incidents

---

## 🔐 Authentication & Access Control
- JWT-based session handling
- Bcrypt for password security
- OTP-based password reset via email (Nodemailer)
- Protected routes: users can only manage their own data
- Incidents marked as “Closed” cannot be edited

---

## 🛠️ Getting Started

### Requirements
- Node.js v14+
- MongoDB (local or Atlas)

### Installation
1. **Clone the repository**
```bash
git clone https://github.com/anshul-c0des/incident-trackr.git
cd incident-trackr
```

2. **Install client and server dependencies:**
```bash
cd client
npm install
cd ../server
npm install
```

3. **Set up Environment Variables:**
   Create a `.env` file inside the `server/` folder:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

4. **Run the App:**
- Start the backend:
```bash
cd server
node src/server.js
```
- Start the frontend:
```bash
cd client
npm run dev
```

---

### ✅ Features Summary

- 📝 User registration with auto-location
- 🔐 JWT auth and password hashing
- 📧 OTP-based password reset via email
- 📊 Incident creation with filters & unique IDs
- 🔒 Edit restrictions for closed incidents
- 👤 User-based incident access
- 💡 Responsive and interactive UI

- ---

## ✨ Additional Features

- 🧭 Auto-location: Fetch City & Country from Pincode using Zippopotamus API
- 🔍 Filtering: Incident dashboard allows filtering by Priority and Status
- 🔑 Password Reset: Email based verification and set new password
- ✅ Clean, responsive UI with loading states and toasts for UX feedback
