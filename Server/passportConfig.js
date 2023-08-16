const bycrpt = require("bcrypt");
const passportLocal = require("passport-local").Strategy;
const connection = require("./config/dbConfig");

module.exports = function (passport) {
  passport.use(
    new passportLocal((username, password, done) => {
      const sql = "SELECT * FROM Landlord WHERE username = '" + username + "'";

      connection.query(sql, (err, rows, fields) => {
        if (err) throw done(err);
        if (rows.length === 0) return done(null, false);
        bycrpt.compare(password, rows[0].password, (err, result) => {
          if (err) throw done(err);
          if (result === true) {
            return done(null, rows[0]);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    console.log("SERIALIZE USER (PP config): " + user.idLandlord);
    cb(null, user.idLandlord);
  });

  passport.deserializeUser((id, done) => {
    console.log("DESERIALIZING");
    const sql = "SELECT * FROM Landlord WHERE idLandlord = '" + id + "'";
    connection.query(sql, (err, rows, fields) => {
      if (err) {
        console.log("Error fetching user data:", err);
        return done(err); // Pass the error to the done callback
      }
      if (rows.length === 0) {
        console.error("User not found in database");
        return done(null, false); // User not found
      }
      const userInfo = {
        id: rows[0].idLandlord,
        Name: rows[0].Name,
        email: rows[0].username,
      };
      console.log("User info (PP config):", JSON.stringify(userInfo));
      done(null, userInfo);
    });
  });
};
