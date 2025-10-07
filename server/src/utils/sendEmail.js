import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,         
    pass: process.env.GMAIL_APP_PASSWORD, 
  },
});

export const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: `"Incident Trackr" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Your OTP for Password Reset',
      html: `
        <p>Hello,</p>
        <p>Your OTP for resetting your password is: <strong>${otp}</strong></p>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.error('Failed to send OTP email:', err);
    throw new Error('Could not send OTP email');
  }
};
