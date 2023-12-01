const { User } = require("../models/user");
const { controllerWrapper, HttpError } = require("../helpers");

//? ===  CurrentUser ===

const getCurrent = async (req, res) => {
  const { user } = req;

  res.status(200).json({
    user: {
      email: user.email,
      token: user.token,
      name: user.name,
      gender: user.gender,
      dailyNormal: user.dailyNormal,
    },
  });
};

module.exports = {
  getCurrent: controllerWrapper(getCurrent),
};
