const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

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

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject(err); // Pass the error as a reason for rejection
        }
        resolve(token);
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

sendEmail({
  subject: "Test",
  text: "I am sending an email from nodemailer!",
  to: "keasiley@icloud.com",
  from: process.env.EMAIL,
});
// Example options
const emailOptions = {
  subject: "Test",
  text: "I am sending an email from nodemailer!",
  to: "keasiley@icloud.com",
  from: process.env.EMAIL,
};

module.exports = {
  sendEmailNotification,
};
