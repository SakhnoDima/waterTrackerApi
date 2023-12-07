const nodemailer = require("nodemailer");
const HttpError = require("./httpErrors");
require("dotenv").config();

const transport = nodemailer.createTransport({
  service: "gmail.com",
  auth: {
    user: process.env.META_USER,
    pass: process.env.META_PASS,
  },
});

const mailSenderTransport = async (data) => {
  const email = {
    ...data,
    from: process.env.META_USER,
  };

  await transport.sendMail(email).catch((error) => {
    throw HttpError(500, `There are problems on the server, try again later.`);
  });
};

module.exports = mailSenderTransport;
