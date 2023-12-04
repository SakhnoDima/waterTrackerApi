const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { waterId } = req.params;
  if (!isValidObjectId(waterId)) {
    next(HttpError(404, `${waterId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
