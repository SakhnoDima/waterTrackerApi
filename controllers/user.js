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

//? ===  Update User Info ===

const userUpdate = async (req, res) => {
  const { _id, email } = req.user;
  const { email: newEmail, password } = req.body;

  // is user with new email exist in base

  if (newEmail && email !== newEmail) {
    const user = await User.findOne({ email: newEmail });
    if (user) {
      throw HttpError(401, `User with email: ${newEmail} already exist`);
    }
  }

  // update user

  const newUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (password) {
    newUser.setPass(password);
    await newUser.save();
  }

  res.status(200).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      gender: newUser.gender,
    },
  });
};

module.exports = {
  getCurrent: controllerWrapper(getCurrent),
  userUpdate: controllerWrapper(userUpdate),
};
