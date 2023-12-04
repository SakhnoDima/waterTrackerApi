const { controllerWrapper, HttpError } = require("../helpers");
const { Water } = require("../models/water");

//? ===  Add Info About Water Rate ===

const setWaterData = async (req, res) => {
  const { _id: owner } = req.user;
  const { amount, time } = req.body; //! подумать как фильтровать!?!?

  const result = await Water.create({ amount, time, owner });

  res.status(201).json({
    _id: result._id,
    amount: result.amount,
    time: result.time,
  });
};

//? ===  Update Info About Water Rate ===

const updateWater = async (req, res) => {
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
  });
};

module.exports = {
  setWaterData: controllerWrapper(setWaterData),
  updateWater: controllerWrapper(updateWater),
  removeWaterInfo: controllerWrapper(removeWaterInfo),
};
