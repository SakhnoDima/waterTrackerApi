const { Water } = require("../models/water");

const monthInfoWaterList = async (owner, month, norma) => {
  return Water.aggregate([
    { $match: { owner: owner, month: month } },
    {
      $group: {
        _id: {
          day: "$day",
        },
        total: { $sum: "$amount" },
        count: { $count: {} },
      },
    },
    {
      $addFields: {
        dailyNorma: norma,
        month: month,
        day: "$_id.day",
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);
};

module.exports = monthInfoWaterList;
