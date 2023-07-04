const jwt = require("jsonwebtoken");

const  jwtSecret  = 'secret'
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

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
