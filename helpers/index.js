const handleMongooseError = require("./handleMongooseError");
const HttpError = require("./httpErrors");
const controllerWrapper = require("./controllerWrapper");
const { tokenCreator, isValidToken } = require("./tokenWorkPlace");
const setAvatar = require("./useAvatar");
const { stringifiedParams, getUserFromGoogle } = require("./googleAuth");
const userCreator = require("./addedUser");
const totalWaterPerToday = require("./totalWaterPerToday");
const getWaterUsePercent = require("./getWaterUsePercent");
const getDateInfo = require("./getDateInfo");

module.exports = {
  handleMongooseError,
  HttpError,
  controllerWrapper,
  tokenCreator,
  isValidToken,
  setAvatar,
  stringifiedParams,
  getUserFromGoogle,
  userCreator,
  totalWaterPerToday,
  getWaterUsePercent,
  getDateInfo,
};
