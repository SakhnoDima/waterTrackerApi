const { Water } = require("../models/water");
const numDays = require("./getAllDaysOfMonth");
const getDateInfo = require("./getDateInfo");
const getWaterUsePercent = require("./getWaterUsePercent");
const HttpError = require("./httpErrors");

const getMonthList = async (date, norma, owner) => {
  const result = [];
  // Get date info
  const { month, year } = getDateInfo(date);

  const newMonth = month + 1;

  const currentYear = new Date().getFullYear();

  if (
    !newMonth ||
    !year ||
    !(currentYear - 3 < year && year < currentYear + 3)
  ) {
    throw HttpError(404, `Date is note correct`);
  }

  // Get the number of days in a month
  const daysInMonth = numDays(year, newMonth);

  for (let index = 1; index <= daysInMonth; index++) {
    const monthlyWaterList = await Water.find(
      {
        day: index,
        owner,
        month,
        year,
      },
      "amount time"
    ).exec();

    // Get the total amount of drink water for today's date
    const total = await totalWaterPerToday(monthlyWaterList);

    // Get the percent from dailyWater
    const percent = getWaterUsePercent(total, norma);

    result.push({
      date: {
        day: index,
        month: month + 1,
      },
      dailyNorma: norma,
      percent: percent,
      quantity: monthlyWaterList.length,
    });
  }
  return result;
};

module.exports = getMonthList;
