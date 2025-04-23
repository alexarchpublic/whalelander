import type { VercelRequest, VercelResponse } from '@vercel/node';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Log request details
  console.log('Request method:', req.method);
  console.log('Request headers:', req.headers);

  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
    console.log('Received request body:', req.body);
    const { email, name } = req.body;

    // Validate required fields
    if (!email || !name) {
      console.log('Missing required fields:', { email, name });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Log SendGrid configuration
    console.log('SendGrid Config:', {
      hasApiKey: !!process.env.SENDGRID_API_KEY,
      fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com',
    });

    // Send confirmation email
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com',
      subject: 'Entry Confirmation',
      text: `Thank you ${name} for your entry!`,
      html: `<p>Thank you <strong>${name}</strong> for your entry!</p>`,
    };

    await sgMail.send(msg);
    console.log('Email sent successfully to:', email);
    return res.status(200).json({ message: 'Confirmation email sent' });
  } catch (error) {
    console.error('Error sending confirmation:', error);
    return res.status(500).json({ 
      message: 'Error sending confirmation email',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
} 