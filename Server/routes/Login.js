const express = require("express");
const router = express.Router();
const connection = require("../config/dbConfig");
const bycrpt = require("bcrypt");
const passport = require("passport");

router.post("/", (req, res, next) => {
  connection.connect();
  let info = req.body;
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send('"No User EXISTS"');
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send('"SUCESS"');
     
      });
    }
  })(req, res, next);
});

module.exports = router;
