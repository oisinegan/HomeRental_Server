const express = require("express");
const router = express.Router();
const connection = require("../config/dbConfig");

const validateQuery = (filterRes) => {
  if (filterRes.Type === "") {
    filterRes.Type = "%";
  }
  if (filterRes.City === "") {
    filterRes.City = "%";
  }
  if (filterRes.County === "") {
    filterRes.County = "%";
  }
  if (filterRes.MinPrice === "") {
    filterRes.MinPrice = "0";
  }
  if (filterRes.MaxPrice === "") {
    filterRes.MaxPrice = Number.MAX_SAFE_INTEGER;
  }
  if (filterRes.MinBedrooms === "") {
    filterRes.MinBedrooms = "0";
  }
  if (filterRes.MaxBedrooms === "") {
    filterRes.MaxBedrooms = Number.MAX_SAFE_INTEGER;
  }
  if (filterRes.MinBathrooms === "") {
    filterRes.MinBathrooms = "0";
  }
  if (filterRes.MaxBathrooms === "") {
    filterRes.MaxBathrooms = Number.MAX_SAFE_INTEGER;
  }
};

router.post("/", (req, res) => {
  connection.connect();

  let info = req.body;

  validateQuery(info);

  const sql =
    "SELECT Home.*, Urls.*, Landlord.Name FROM Home INNER JOIN URLs ON Home.idHome = Urls.idHome INNER JOIN landlord ON Home.idLandlord = Landlord.idLandlord WHERE Price BETWEEN " +
    info.MinPrice +
    " AND " +
    info.MaxPrice +
    " AND Bedrooms BETWEEN " +
    info.MinBedrooms +
    " AND " +
    info.MaxBedrooms +
    " AND Bathrooms BETWEEN " +
    info.MinBathrooms +
    " AND " +
    info.MaxBathrooms +
    " AND City LIKE '" +
    info.City +
    "%'" +
    " AND County LIKE '" +
    info.County +
    "%'" +
    " AND Type LIKE '" +
    info.Type +
    "%'";

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
