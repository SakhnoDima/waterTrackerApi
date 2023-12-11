const handleMongooseError = require("./handleMongooseError");
const HttpError = require("./httpErrors");
const controllerWrapper = require("./controllerWrapper");
const { tokenCreator, isValidToken } = require("./tokenWorkPlace");
const setAvatar = require("./useAvatar");
const { stringifiedParams, getUserFromGoogle } = require("./googleAuth");
const userCreator = require("./addedUser");
const monthInfoWaterList = require("./getWaterListInfo");
const getWaterUsePercent = require("./getWaterUsePercent");
const getDateInfo = require("./getDateInfo");
const numDays = require("./getAllDaysOfMonth");
const getMonthList = require("./getMonthList");
const mailSenderTransport = require("./mailSender");
const passwordGenerator = require("./passwordGenerator");
const totalWaterPerToday = require("./totalWaterPerToday");

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
  monthInfoWaterList,
  getWaterUsePercent,
  getDateInfo,
  numDays,
  getMonthList,
  mailSenderTransport,
  passwordGenerator,
  totalWaterPerToday,
};
