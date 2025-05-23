import type { VercelRequest, VercelResponse } from '@vercel/node';
const sgMail = require('@sendgrid/mail');

// Initialize SendGrid
async function initSendGrid() {
  try {
    console.log('Initializing SendGrid with environment variables:', {
      hasApiKey: !!process.env.SENDGRID_API_KEY,
      fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com'
    });

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    return sgMail;
  } catch (error) {
    console.error('Error initializing SendGrid:', error);
    throw error;
  }
}

// API configuration
module.exports.config = {
  api: {
    bodyParser: true,
  },
};

// API handler
async function handler(req: VercelRequest, res: VercelResponse) {
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

    // Initialize SendGrid
    const mailer = await initSendGrid();

    // Send confirmation email
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com',
      subject: 'Entry Confirmation - Arch Public Whale Giveaway',
      text: `Congratulations! You've secured your entry into our extraordinary giveaway. One lucky winner will take home a Rolex, Louis Vuitton luggage, an Louis Vuitton watch case, a $25,000 Arch Public Crypto Concierge Lifetime Membership, and - to cap it off - a bottle of Dom Pérignon.

As a valued participant, you're now part of our elite circle of Whales, whom we're thrilled to connect with. During the conference (May 27–29), expect personalized communications from us with exclusive invitations to private events hosted by Arch Public. These events are crafted to offer unparalleled speakers, networking opportunities, and insights tailored to your interests.

You now have exclusive access to our private event schedule, which will be continuously updated throughout the conference: https://docs.google.com/document/d/1rw_ahu3XjvjEm-z-zyofLXgXeSk0xYQ95dMknX9KKFA/edit?usp=sharing

This schedule is invite-only, and as you're reading this email, you are officially part of our exclusive guest list. We're excited to build a relationship with you. If you have any questions or wish to connect with our team before/during the conference, reach out to Daniel (daniel@thearchpublic.com).

Thank you for joining us, and we look forward to seeing you at Bitcoin 2025!

Best regards,
The Arch Public Team`,
      html: `<p>Congratulations! You've secured your entry into our extraordinary giveaway. One lucky winner will take home a Rolex, Louis Vuitton luggage, an Louis Vuitton watch case, a $25,000 Arch Public Crypto Concierge Lifetime Membership, and - to cap it off - a bottle of Dom Pérignon.</p>

<p>As a valued participant, you're now part of our elite circle of Whales, whom we're thrilled to connect with. During the conference (May 27–29), expect personalized communications from us with exclusive invitations to private events hosted by Arch Public. These events are crafted to offer unparalleled speakers, networking opportunities, and insights tailored to your interests.</p>

<p>You now have exclusive access to our private event schedule, which will be continuously updated throughout the conference: <a href="https://docs.google.com/document/d/1rw_ahu3XjvjEm-z-zyofLXgXeSk0xYQ95dMknX9KKFA/edit?usp=sharing">View Private Event Schedule</a></p>

<p><strong>This schedule is invite-only, and as you're reading this email, you are officially part of our exclusive guest list.</strong></p>

<p>We're excited to build a relationship with you. If you have any questions or wish to connect with our team before/during the conference, reach out to Daniel (<a href="mailto:daniel@thearchpublic.com">daniel@thearchpublic.com</a>).</p>

<p>Thank you for joining us, and we look forward to seeing you at Bitcoin 2025!</p>

<p>Best regards,<br>
The Arch Public Team</p>`,
    };

    await mailer.send(msg);
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

// Export the handler
module.exports = handler; 