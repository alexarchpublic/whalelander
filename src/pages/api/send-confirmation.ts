import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, name } = req.body;

    // Validate required fields
    if (!email || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

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

    await sgMail.send(msg);

    return res.status(200).json({ message: 'Confirmation email sent' });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return res.status(500).json({ message: 'Error sending confirmation email' });
  }
} 