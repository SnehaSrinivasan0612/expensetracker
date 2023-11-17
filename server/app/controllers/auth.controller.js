const db = require("../models");
const config = require("../config/auth.config");
const User = db.tables.Users;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    UserName: req.body.UserName,
    UserEmail: req.body.UserEmail,
    PasswordHash: bcrypt.hashSync(req.body.Password, 8)
  })
    .catch(err => {
      res.status(500).send({ message: err.message });
      return;
    });
  res.send({ message: "User registered successfully!" });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      UserName: req.body.UserName
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.Password,
        user.PasswordHash
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      console.log("Signed in:", user.id);
      const token = jwt.sign({ UserID: user.id },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });


      res.status(200).send({
        id: user.UserID,
        UserName: user.UserName,
        UserEmail: user.UserEmail,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
