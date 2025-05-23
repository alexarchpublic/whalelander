import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fullName, email, phone } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Append data to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:D', // Adjust range as needed
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[fullName, email, phone, new Date().toISOString()]],
      },
    });

    return res.status(200).json({ message: 'Entry submitted successfully' });
  } catch (error) {
    console.error('Error submitting entry:', error);
    return res.status(500).json({ message: 'Error submitting entry' });
  }
} 