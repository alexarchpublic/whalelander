import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

// Initialize Google Sheets API
let auth;
let sheets;

try {
  // Log environment variables (without exposing sensitive data)
  console.log('Environment check:', {
    hasClientEmail: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    hasPrivateKey: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
    hasSpreadsheetId: !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    privateKeyLength: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.length,
  });

  if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY || !process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
    throw new Error('Missing required Google Sheets environment variables');
  }

  auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  sheets = google.sheets({ version: 'v4', auth });
  console.log('Google Sheets API initialized successfully');
} catch (error) {
  console.error('Error initializing Google Sheets:', error);
}

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

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

  // Check if Google Sheets is properly initialized
  if (!auth || !sheets) {
    console.error('Google Sheets API not properly initialized');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  try {
    console.log('Received request body:', req.body);
    const { fullName, email, phone } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone) {
      console.log('Missing required fields:', { fullName, email, phone });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Log Google Sheets operation details
    console.log('Attempting to append data:', {
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:D',
      values: [[fullName, email, phone, new Date().toISOString()]],
    });

    // Append data to Google Sheet
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[fullName, email, phone, new Date().toISOString()]],
      },
    });

    console.log('Google Sheets response:', result.data);
    return res.status(200).json({ message: 'Entry submitted successfully' });
  } catch (error) {
    console.error('Error submitting entry:', {
      error: error.message,
      stack: error.stack,
      code: error.code,
      details: error.response?.data
    });
    
    return res.status(500).json({ 
      message: 'Error submitting entry',
      details: process.env.NODE_ENV === 'development' ? {
        error: error.message,
        code: error.code,
        details: error.response?.data
      } : undefined
    });
  }
} 