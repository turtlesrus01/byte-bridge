const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
// const nodemailer = require('nodemailer');
const { typeDefs, resolvers } = require('./schema');
const db = require('./config/connection');
require('dotenv').config();

//Port for the server
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
//Apollo server middleware
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })

  // let transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     type: "OAuth2",
  //     user: process.env.EMAIL,
  //     pass: process.env.WORD,
  //     clientId: process.env.OAUTH_CLIENTID,
  //     clientSecret: process.env.OAUTH_CLIENT_SECRET,
  //     refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  //   },
  //  });
  //  transporter.verify((err, success) => {
  //   err
  //     ? console.log(err)
  //     : console.log(`=== Server is ready to take messages: ${success} ===`);
  //  });

  //  let mailOptions = {
  //   from: "test@gmail.com",
  //   to: process.env.EMAIL,
  //   subject: "Nodemailer API",
  //   text: "Hi from your nodemailer API",
  //  };
  
  //  transporter.sendMail(mailOptions, (err, info) => {
  //  transporter.sendMail(mailOptions, function (err, data) {
  //   console.log("Recipient Email:", process.env.EMAIL);

  //   if (err) {
  //     console.log("Error " + err);
  //   } else {
  //     console.log("Email sent successfully");
      
  //   }
  // });
  };
//Start Apollo server
startApolloServer();