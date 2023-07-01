import express from 'express';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

const authRouter = express.Router();
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// OAuth Routes
authRouter.get('/oauth', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/plus.me'],
  });

  res.redirect(authUrl);
});

authRouter.get('/oauth-callback', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // Perform additional logic with the tokens, such as storing them in the database or using them to make API requests

  res.send('OAuth callback successful!');
});

export default authRouter;