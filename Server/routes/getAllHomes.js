const express = require("express");
const router = express.Router();
const connection = require("../config/dbConfig");

router.get("/", (req, res) => {
  console.log("GETTING ALL HOMES");
  connection.connect();

  connection.query(
    "SELECT Home.*, Urls.*, Landlord.Name FROM Home INNER JOIN Urls ON Home.idHome = Urls.idHome INNER JOIN Landlord ON Home.idLandlord = Landlord.idLandlord;",

    (err, rows, fields) => {
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
    }
  );
});

module.exports = router;
