const jwt = require("jsonwebtoken");
const { tokenExpires } = require("../constant/constant");

const { SECRET_KEY } = process.env;

const tokenCreator = async (payload) => {
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: `${tokenExpires}h`,
  });
  return token;
};

const isValidToken = async (token) => {
  const { id } = jwt.verify(token, SECRET_KEY);
  return id;
};

module.exports = { tokenCreator, isValidToken };
