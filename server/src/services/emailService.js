import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter = null;

if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export const sendContactNotification = async ({ name, email, subject, message }) => {
  if (!transporter) {
    console.info('SMTP not configured. Message saved to database only.');
    return { sent: false, reason: 'SMTP not configured' };
  }

  try {
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || 'jvm.prasanjeet@gmail.com',
      replyTo: email,
      subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #6366f1;">New Portfolio Contact Message</h2>
          <p><strong>Sender:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 6px;">
            <p style="white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #94a3b8;">Delivered automatically from Prasanjeet Kumar Mandal Portfolio API.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.info('Email notification sent successfully:', info.messageId);
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email notification:', error);
    return { sent: false, error: error.message };
  }
};
