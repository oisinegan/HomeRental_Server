const express = require("express");
const router = express.Router();
const connection = require("../config/dbConfig");

router.get("/", (req, res) => {
  if (req.user === undefined) {
    res.send('"undefined"');
  } else {
    res.send(req.user);
  }
});

module.exports = router;
