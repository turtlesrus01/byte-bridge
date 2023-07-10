const jwt = require("jsonwebtoken");
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

//const { jwtSecret } = require('../config/secret');
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = getTokenFromRequest(req);

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, jwtSecret, {
        maxAge: expiration,
      });
      req.user = data;
    } catch {
      console.log("Invalid token");
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
    if (token.startsWith("Bearer ")) {
      // Removes the "Bearer " prefix
      token = token.slice(7); 
    } else {
      throw new Error("Invalid token format");
    }
  }

  return token;
}