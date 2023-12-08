const {
  controllerWrapper,
  HttpError,
  getDateInfo,
  getWaterUsePercent,
  totalWaterPerToday,
  getMonthList,
} = require("../helpers");

const { User } = require("../models/user");
const { Water } = require("../models/water");

//? ===  Add Info About Water Rate ===

const setWaterData = async (req, res) => {
  const { _id: owner } = req.user;
  const { amount, time } = req.body;

  // Getting full details from user data (time)

  const { day, month, year } = getDateInfo(time);

  const result = await Water.create({
    amount,
    time,
    day,
    month,
    year,
    owner,
  });

  res.status(201).json({
    _id: result._id,
    amount: result.amount,
    time: result.time,
  });
};

//? ===  Update Info About Water Rate ===

const updateWater = async (req, res) => {
  const { _id } = req.user;
  const { waterId } = req.params;
  const { amount, time } = req.body;

  //! Пользователь может сминить время только в рамках текущего дня????
  //   const data = Date.now();
  //   const dayToday = new Date(data).getUTCDate();
  //   const dayFromFront = new Date(time).getUTCDate();

  //   if (dayToday !== dayFromFront) {
  //     throw HttpError(409, `You can only change the time on the current day!`);
  //   }

  const result = await Water.findByIdAndUpdate(
    waterId,
    { time, amount },
    {
      new: true,
    }
  );

  if (!result) {
    throw HttpError(404, `Don't have data with such id : ${waterId}!`);
  }
  res.status(201).json({
    _id: result._id,
    amount: result.amount,
    time: result.time,
  });
};

//? ===  Remove Info About Water Rate ===

const removeWaterInfo = async (req, res) => {
  const { waterId } = req.params;

  const result = await Water.findByIdAndDelete(waterId);

  if (!result) {
    throw HttpError(404, `Don't have data with such id : ${waterId}!`);
  }
  res.status(200).json({
    message: "Information about water has been successfully deleted!",
    removedId: waterId,
  });
};

//? ===  Get daily info  ===
const getWaterToday = async (req, res) => {
  const { _id: owner } = req.user;
  const { dailyNorma } = await User.findById(owner);

  //! if (!dailyNorma) {
  //!   throw HttpError(404, `Please add your daily water rate`);
  //! }

  // Getting full details from user data (time)
  const { day, month, year } = getDateInfo(Date.now());

  // Filter the entire list by today's date
  const dailyWaterList = await Water.find(
    {
      owner,
      day,
      month,
      year,
    },
    "amount time"
  ).exec();

  // Get the total amount of drink water for today's date
  const total = await totalWaterPerToday(dailyWaterList);

  // Get the percent from dailyWater
  const percent = getWaterUsePercent(total, dailyNorma);

  res.status(201).json({
    percent,
    dailyWaterList,
  });
};

//? ===  Get monthly info  ===
const getWaterPerMonth = async (req, res) => {
  const { date } = req.query;
  const { _id: owner } = req.user;
  const { dailyNorma } = await User.findById(owner);

  const rez = await getMonthList(date, dailyNorma, owner);

  res.status(201).json([...rez]);
};

module.exports = {
  setWaterData: controllerWrapper(setWaterData),
  updateWater: controllerWrapper(updateWater),
  removeWaterInfo: controllerWrapper(removeWaterInfo),
  getWaterToday: controllerWrapper(getWaterToday),
  getWaterPerMonth: controllerWrapper(getWaterPerMonth),
};
