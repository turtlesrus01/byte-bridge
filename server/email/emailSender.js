const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();

// Nodemailer Setup
const sendEmailNotification = async (emailOptions) => {
  try {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });
    
    const accessToken = await oauth2Client.getAccessToken();

    oauth2Client.on('tokens', (tokens) => {
      if (tokens.refresh_token) {
        // Save the new refresh token if it's returned
        process.env.REFRESH_TOKEN = tokens.refresh_token;
      }
      // Save the new access token
      oauth2Client.setCredentials({
        access_token: tokens.access_token,
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });

    await transporter.sendMail(emailOptions);
  } catch (error) {
    throw new Error("Failed to create transporter: " + error.message);
  }
};


// Example options
const emailOptions = {
  subject: "Test",
  text: "I am sending an email from nodemailer!",
  to: "keasiley@icloud.com",
  from: process.env.EMAIL,
};

sendEmailNotification(emailOptions);

module.exports = {
  sendEmailNotification,
};
