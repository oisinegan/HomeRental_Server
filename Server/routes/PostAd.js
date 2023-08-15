const express = require("express");
const router = express.Router();
const connection = require("../config/dbConfig");

router.post("/", async (req, res) => {
  const info = req.body;

  try {
    const insertHomeQuery = `
      INSERT INTO HomeRental.Home (
        Type, Address, City, County, Price, Bedrooms, Bathrooms,
        idLandlord, DatePosted, Folder, Description
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await connection
      .promise()
      .execute(insertHomeQuery, [
        info.Type,
        info.Address,
        info.City,
        info.County,
        info.Price,
        info.Bedrooms,
        info.Bathrooms,
        info.idLandlord,
        info.DatePosted,
        info.Folder,
        info.Description,
      ]);

    const homeId = result[0].insertId;

    const insertUrlsQuery = `
      INSERT INTO HomeRental.Urls (idHome, Url) VALUES ?
    `;

    const urlValues = info.urls.map((url) => [homeId, url]);

    await connection.promise().query(insertUrlsQuery, [urlValues]);

    res.send('"RECEIVED"');
  } catch (error) {
    res.status(500).send('"Error inserting data"');
  }
});

module.exports = router;
