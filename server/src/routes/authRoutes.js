import express from 'express';
import {
  loginUser,
  sendOtp,
  verifyOtp,
  resetPassword
} from '../controllers/authController.js';

const router = express.Router();

// user login
router.post('/login', loginUser);

// otp routes
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

export default router;
