import express from 'express';
import {
  loginUser,
  sendOtp,
  verifyOtp,
  resetPassword
} from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

export default router;
