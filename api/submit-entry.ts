import type { VercelRequest, VercelResponse } from '@vercel/node';
const { google } = require('googleapis');

// Initialize Google Sheets
async function initGoogleSheets() {
  try {
    console.log('Initializing Google Sheets with environment variables:', {
      hasClientEmail: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
      hasSpreadsheetId: !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID
    });

    // Properly format the private key
    let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY || '';
    
    // Handle different possible formats of the private key
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    
    // Replace literal \n with newlines and ensure proper PEM format
    privateKey = privateKey.replace(/\\n/g, '\n');
    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
      console.error('Private key is not in the correct format');
      throw new Error('Invalid private key format');
    }

    console.log('Private key format check:', {
      startsWithHeader: privateKey.includes('-----BEGIN PRIVATE KEY-----'),
      endsWithFooter: privateKey.includes('-----END PRIVATE KEY-----'),
      containsNewlines: privateKey.includes('\n'),
      length: privateKey.length
    });

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: privateKey
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Error initializing Google Sheets:', error);
    if (error.opensslErrorStack) {
      console.error('OpenSSL Error Details:', {
        stack: error.opensslErrorStack,
        library: error.library,
        reason: error.reason,
        code: error.code
      });
    }
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
    const { fullName, email, phone } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone) {
      console.log('Missing required fields:', { fullName, email, phone });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Initialize Google Sheets
    const sheets = await initGoogleSheets();
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    console.log('Appending data to Google Sheet:', {
      spreadsheetId,
      range: 'Sheet1',
      data: [fullName, email, phone]
    });

    // Append data to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[fullName, email, phone, new Date().toISOString()]]
      }
    });

    console.log('Successfully appended data:', response.data);
    return res.status(200).json({ message: 'Entry submitted successfully' });
  } catch (error) {
    console.error('Error submitting entry:', error);
    return res.status(500).json({ 
      message: 'Error submitting entry',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Export the handler
module.exports = handler; 