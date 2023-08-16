const express = require("express");
const router = express.Router();
const connection = require("../config/dbConfig");

router.post("/", (req, res) => {
  connection.connect();

  let info = req.body;

  const sql =
    "SELECT Home.*, Urls.*, Landlord.Name, LandLord.username FROM Home INNER JOIN Urls ON Home.idHome = Urls.idHome INNER JOIN Landlord ON Home.idLandlord = Landlord.idLandlord WHERE Home.idHome = '" +
    info.id +
    "'";

  connection.query(sql, (err, rows, fields) => {
    if (err) throw err;
    const homes = {};
    rows.forEach((row) => {
      const {
        idHome,
        Type,
        Address,
        City,
        County,
        Price,
        Description,
        Bedrooms,
        Bathrooms,
        DatePosted,
        Name,
        username,
        Url,
      } = row;
      //If doesn't exist create row
      if (!homes[idHome]) {
        homes[idHome] = {
          Address,
          Type,
          City,
          County,
          Price,
          Description,
          Bedrooms,
          Bathrooms,
          DatePosted,
          Name,
          username,
          urls: [Url],
        };
      }
      //If exists just add url to url array
      else {
        homes[idHome].urls.push(Url);
      }
    });

    res.send(homes);
  });
});

module.exports = router;
