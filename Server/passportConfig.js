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
    cb(null, user.idLandlord);
  });

  passport.deserializeUser((id, done) => {
    const sql = "SELECT * FROM Landlord WHERE idLandlord = '" + id + "'";
    connection.query(sql, (err, rows, fields) => {
      if (err) throw err;
      const userInfo = {
        id: rows[0].idLandlord,
        Name: rows[0].Name,
        email: rows[0].username,
      };
      console.log("ID(PP config): " + rows[0].idLandlord);
      console.log("Name(PP config): " + rows[0].Name);
      console.log("email(PP config): " + rows[0].username);
      console.log("USER INFO(PP config): " + userInfo);
      done(null, userInfo);
    });
  });
};
