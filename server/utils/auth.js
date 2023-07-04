const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secret");
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
<<<<<<< HEAD
      const { data } = jwt.verify(token, jwtSecret, { maxAge: expiration });
=======
      const { data } = jwt.verify(token, jwtSecret, {
        maxAge: expiration,
      });
>>>>>>> 93b08912f0daf94283bf83b7486428d750337f09
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
