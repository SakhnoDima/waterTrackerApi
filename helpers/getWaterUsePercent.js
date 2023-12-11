const getWaterUsePercent = (totalUse, norma) => {
  return (totalUse * 100) / norma || null;
};

module.exports = getWaterUsePercent;
