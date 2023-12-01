const { httpErrors } = require("../constant/constant");

const HttpError = (status, message = httpErrors[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
