const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.tables.Users;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token,
    config.secret,
    (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.body.UserID = decoded.UserID;
      console.log(decoded)
      next();
    });
};
const authJwt = {
  verifyToken: verifyToken
};
module.exports = authJwt;
