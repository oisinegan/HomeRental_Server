const express = require("express");
const router = express.Router();
const connection = require("../config/dbConfig").default;
const bycrpt = require("bcrypt");

router.post("/", (req, res) => {
  connection.connect();
  let info = req.body;

  connection.query(
    "SELECT * FROM Landlord WHERE username = '" + info.username + "'",
    async (err, rows, fields) => {
      if (err) throw err;

      if (rows[0] != undefined) {
        res.send(false);
      } else {
        const hashedPassword = await bycrpt.hash(info.password, 10);

        const sql =
          "INSERT INTO Landlord (`Name`, `username`, `password`) VALUES ('" +
          info.Name +
          "', '" +
          info.username +
          "', '" +
          hashedPassword +
          "')";
        connection.query(sql, (err, rows, fields) => {
          if (err) throw err;

          res.send(true);
        });
      }
    }
  );
});

module.exports = router;
