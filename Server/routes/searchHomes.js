const express = require("express");
const router = express.Router();
const connection = require("../config/dbConfig");

router.post("/", (req, res) => {
  connection.connect();
  let info = req.body;
  const sql =
    "SELECT Home.*, Urls.*, Landlord.Name FROM Home INNER JOIN URLs ON Home.idHome = Urls.idHome INNER JOIN landlord ON Home.idLandlord = Landlord.idLandlord WHERE Address LIKE '" +
    info.search +
    "%' OR City LIKE '" +
    info.search +
    "%'  OR County LIKE '" +
    info.search +
    "%' ";

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
        Bedrooms,
        Bathrooms,
        DatePosted,
        Name,
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
          Bedrooms,
          Bathrooms,
          DatePosted,
          Name,
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
