const getDateInfo = (date) => {
  const day = new Date(date).getUTCDate();
  const month = new Date(date).getMonth();
  const year = new Date(date).getFullYear();

  return { day, month: month + 1, year };
};

module.exports = getDateInfo;
