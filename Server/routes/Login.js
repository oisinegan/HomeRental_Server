const express = require("express");
const router = express.Router();
const connection = require("../config/dbConfig");
const bycrpt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

router.post("/", (req, res, next) => {
  connection.connect();
  let info = req.body;
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.send({ user: false });
    } else {
      const token = jwt.sign(user, secretKey, { expiresIn: "1h" });

      req.logIn(user, (err) => {
        if (err) throw err;
        const token = jwt.sign(
          { email: user.username, name: user.Name, id: user.idLandlord },
          secretKey,
          { expiresIn: "15m" }
        );
        console.log(user.username);
        res.send({ user: token });
      });
    }
  })(req, res, next);
});

module.exports = router;
