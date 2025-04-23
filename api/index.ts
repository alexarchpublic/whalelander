import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import submitEntryRouter from './submitEntry';
import sendConfirmationRouter from './sendConfirmation';

// Load environment variables
dotenv.config();

// Check required environment variables
const requiredEnvVars = [
  'GOOGLE_SHEETS_CLIENT_EMAIL',
  'GOOGLE_SHEETS_PRIVATE_KEY',
  'GOOGLE_SHEETS_SPREADSHEET_ID'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  process.exit(1);
}

console.log('Environment variables check passed:', {
  GOOGLE_SHEETS_CLIENT_EMAIL: 'present',
  GOOGLE_SHEETS_PRIVATE_KEY: process.env.GOOGLE_SHEETS_PRIVATE_KEY ? 'present' : 'missing',
  GOOGLE_SHEETS_SPREADSHEET_ID: 'present',
});

const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(express.json());

// Simple CORS configuration
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Handle OPTIONS requests
app.options('*', (_, res) => {
  res.sendStatus(200);
});

// Routes
app.use('/api', submitEntryRouter);
app.use('/api', sendConfirmationRouter);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

// For local development
if (process.env.NODE_ENV === 'development') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV);
  });
}

// For Vercel
export default app; 