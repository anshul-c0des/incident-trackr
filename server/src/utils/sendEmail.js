import { Resend } from 'resend';
import dotenv from 'dotenv'

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (email, otp) => {
  try {
    const response = await resend.emails.send({
      from: 'no-reply@incident-trackr.com',
      to: email,
      subject: 'Your OTP for Password Reset',
      html: `<p>Your OTP is: <strong>${otp}</strong></p><p>It is valid for 5 minutes.</p>`,
    });

    return response;
  } catch (err) {
    console.error('Resend email error:', err);
    throw new Error('Failed to send email');
  }
};
