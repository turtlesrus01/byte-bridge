const jwt = require("jsonwebtoken");
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

//const { jwtSecret } = require('../config/secret');
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    // Logs entire header
    console.log("Request Headers:", req.headers);

    let token = getTokenFromRequest(req);

    // Logs the token value
    console.log("Token:", token); 

    if (!token) {
      return req;
    }

    try {
      const decodedToken = jwt.verify(token, jwtSecret, {
        maxAge: expiration,
      });
      // Decoded token
      console.log("Decoded Token:", decodedToken); 

      req.user = data;
    } catch (error) {
      console.log("Invalid token", error);
      // Log the error if token is invalid or expired
      throw new AuthenticationError("Invalid or expired token");
    }

    return req;
  },
  signToken:
   function ({ email, username, _id, password }) {
    const payload = { email, username, _id, password};
    return jwt.sign({ data: payload }, jwtSecret, { expiresIn: expiration });
  },
};

function getTokenFromRequest(req) {
  // Get token from header
  let token = req.headers.authorization;

  if (token) {
    if (token.toLowerCase().startsWith("bearer ")) {
      // Removes the "Bearer " prefix
      token = token.slice(7); 
    } else {
      return { error: "Invalid token format" };
    }
  }

  return token;
}