import express, { Request, Response, Router } from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = express.Router();

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

interface SubmissionRequest {
  fullName: string;
  email: string;
  phone: string;
}

router.post('/submit-entry', async (req: Request<{}, {}, SubmissionRequest>, res: Response) => {
  try {
    console.log('Received submission request:', req.body);
    const { fullName, email, phone } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone) {
      console.log('Missing required fields:', { fullName, email, phone });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Log Google Sheets configuration
    console.log('Google Sheets Config:', {
      spreadsheetId: SPREADSHEET_ID,
      clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
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
    console.error('Error submitting entry:', error);
    // Send more detailed error information in development
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `Error submitting entry: ${error.message}`
      : 'Error submitting entry';
    return res.status(500).json({ message: errorMessage });
  }
});

export default router; 