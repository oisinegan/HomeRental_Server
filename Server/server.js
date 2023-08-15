const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bycrpt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretCode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));

app.use(passport.initialize());
app.use(passport.session());

require("./passportConfig")(passport);

const getAllHomesRouter = require("./routes/getAllHomes");
app.use("/getAllHomes", getAllHomesRouter);

const filterHomesRouter = require("./routes/filterHomes");
app.use("/filterHomes", filterHomesRouter);

const searchHomesRouter = require("./routes/searchHomes");
app.use("/searchHomes", searchHomesRouter);

const registerRouter = require("./routes/Register");
app.use("/Register", registerRouter);

const loginRouter = require("./routes/Login");
app.use("/Login", loginRouter);

const getUserRouter = require("./routes/getUser");
app.use("/getUser", getUserRouter);

const postAdRouter = require("./routes/PostAd");
app.use("/PostAd", postAdRouter);

const getPropertyRouter = require("./routes/getProperty");
app.use("/getProperty", getPropertyRouter);

const getRentalsRouter = require("./routes/getRentals");
app.use("/getRentals", getRentalsRouter);

const deletePropertyRouter = require("./routes/deleteProperty");
app.use("/deleteProperty", deletePropertyRouter);

const deleteAccountRouter = require("./routes/deleteAccount");
app.use("/deleteAccount", deleteAccountRouter);

const emailUsersRouter = require("./routes/emailUsers");
app.use("/emailUsers", emailUsersRouter);

app.post("/logout", (req, res, next) => {
  res.clearCookie("connect.sid");
  req.logout(function (err) {
    req.session.destroy(function (err) {
      // destroys the session
      res.send('"LOGGED OUT"');
    });
  });
});
app.listen(8000, () => {
  console.log("Server started on server 8000");
});
