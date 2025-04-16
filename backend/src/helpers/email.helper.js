import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

export async function sendEmail(to, subject, text) {
  try {
    const res = await transporter.sendMail({
      from: config.EMAIL_USER,
      to,
      subject,
      html: text,
    });
  } catch (error) {
    console.error('Помилка надсилання листа:', error);
    throw new Error('Не вдалося надіслати лист');
  }
}
