const getWaterUsePercent = (totalUse, norma) => {
  return (totalUse * 100) / norma;
};

module.exports = getWaterUsePercent;
