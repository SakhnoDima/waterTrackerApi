const { HttpError } = require("../helpers");
const { Water } = require("../models/water");

const isWaterOwner = async (req, res, next) => {
  const { _id } = req.user;
  const { waterId } = req.params;

  const result = await Water.findById(waterId);
  if (result.owner.toString() !== _id.toString()) {
    next(
      HttpError(404, `This water feature does not belong to the current user!`)
    );
  }
  next();
};

module.exports = isWaterOwner;
