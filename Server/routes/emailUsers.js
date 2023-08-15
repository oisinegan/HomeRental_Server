const express = require("express");
const router = express.Router();
const connection = require("../config/dbConfig");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", (req, res) => {
  let info = req.body;

  const msg = {
    to: info.LandlordEmail,
    from: "homerental.emailsender@gmail.com", // Use the email address or domain you verified above
    subject: "Rental application for property #" + info.propId,
    text:
      "Application for Property id: " +
      info.propId +
      " located in " +
      info.propCity +
      ", " +
      info.propCounty +
      "\nApplicant name: " +
      info.Name +
      ". \nApplicant email: " +
      info.Email +
      ". \nPhone number of applicant: " +
      info.Number +
      ". \nTotal occupants: " +
      info.Occupants +
      ". \nMessage from " +
      info.Name +
      ": " +
      info.Message,
  };

  sgMail.send(msg).then(
    () => {},
    (error) => {
      if (error.response) {
      }
    }
  );

  res.send('"We have emailed the landlord using the information provided!"');
});

module.exports = router;
