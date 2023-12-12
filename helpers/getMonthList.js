const numDays = require("./getAllDaysOfMonth");
const getDateInfo = require("./getDateInfo");
const monthInfoWaterList = require("./getWaterListInfo");
const getWaterUsePercent = require("./getWaterUsePercent");
const HttpError = require("./httpErrors");

const getMonthList = async (date, norma, owner) => {
  const list = [];

  const { month, year } = getDateInfo(date);
  const currentYear = new Date().getFullYear();

  if (!month || !year || !(currentYear - 3 < year && year < currentYear + 3)) {
    throw HttpError(404, `Date is note correct`);
  }

  // get Water info
  const listResult = await monthInfoWaterList(owner, month, norma);

  // Get the number of days in a month
  const daysInMonth = numDays(year, month);

  for (let index = 1; index <= daysInMonth; index++) {
    const currentDay = listResult.filter((el) => el.day === index);

    // Get the percent from dailyWater
    const percent = getWaterUsePercent(
      currentDay[0]?.total,
      currentDay[0]?.dailyNorma
    );

    list.push({
      date: {
        day: index,
        month,
      },
      dailyNorma: norma,
      percent: percent,
      quantity: currentDay[0]?.count || null,
    });
  }

  return list;
};

module.exports = getMonthList;
