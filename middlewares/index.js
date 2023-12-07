const validateBody = require("./validateBody");
const isAuthenticate = require("./isAuthenticate");
const upload = require("./uploadFiles");
const isValidId = require("./isValidId");
const isWaterOwner = require("./isWaterOwner");

module.exports = {
  validateBody,
  isAuthenticate,
  upload,
  isValidId,
  isWaterOwner,
};
