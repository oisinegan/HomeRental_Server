const express = require("express");
const router = express.Router();
const connection = require("../config/dbConfig");

router.post("/", (req, res) => {
  connection.connect();

  let info = req.body;

  const sql = "DELETE FROM Home WHERE Home.idHome= '" + info.id + "'";

  connection.query(sql, (err, rows, fields) => {
    if (err) throw err;
    res.send('"SUCCESS"');
  });
});

module.exports = router;
