const totalWaterPerToday = async (dailyWaterList) => {
  const total = await dailyWaterList.reduce(
    (accumulator, { amount }) => (accumulator += amount),
    0
  );
  return total;
};

module.exports = totalWaterPerToday;
