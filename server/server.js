const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
//nodemailer code function
const { sendEmailNotification } = require("./email/emailSender");
const { typeDefs, resolvers } = require("./schema");
const db = require("./config/connection");
require("dotenv").config();

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
//Apollo server middleware
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );

      // Send an email notification
      const emailOptions = {
        subject: "Test",
        text: "I am sending an email from nodemailer!",
        to: "keasiley@icloud.com",
        from: process.env.EMAIL,
      };

      sendEmailNotification(emailOptions);
    });
  });
};

//Start Apollo server
startApolloServer();
