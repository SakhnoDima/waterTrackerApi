const numDays = (y, m) => new Date(y, m + 1, 0).getDate();

module.exports = numDays;
