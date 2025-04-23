import express from 'express';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

// Handle preflight requests
router.options('/send-confirmation', (_req, res) => {
  res.status(200).end();
});

router.post('/send-confirmation', async (req, res) => {
  try {
    console.log('Received confirmation request:', req.body);
    const { email, name } = req.body;

    // Validate required fields
    if (!email || !name) {
      console.log('Missing required fields:', { email, name });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Log SendGrid configuration
    console.log('SendGrid Config:', {
      hasApiKey: !!process.env.SENDGRID_API_KEY,
      fromEmail: process.env.SENDGRID_FROM_EMAIL,
    });

    // Send confirmation email
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL as string,
      subject: 'Entry Confirmation - Whale Lander',
      text: `Dear ${name},\n\nThank you for your entry! This email confirms that we have received your submission.\n\nBest regards,\nWhale Lander Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Entry Confirmation</h2>
          <p>Dear ${name},</p>
          <p>Thank you for your entry! This email confirms that we have received your submission.</p>
          <p>Best regards,<br>Whale Lander Team</p>
        </div>
      `,
    };

    const result = await sgMail.send(msg);
    console.log('SendGrid response:', result);

    return res.status(200).json({ message: 'Confirmation email sent' });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Send more detailed error information in development
    const errorMessage = process.env.NODE_ENV === 'development'
      ? `Error sending confirmation email: ${error.message}`
      : 'Error sending confirmation email';
    return res.status(500).json({ message: errorMessage });
  }
});

export default router; 