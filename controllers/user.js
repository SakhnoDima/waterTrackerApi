const path = require("path");

const { User } = require("../models/user");
const { controllerWrapper, HttpError, setAvatar } = require("../helpers");
const { pictureFormat } = require("../constant/constant");

//? ===  CurrentUser ===

const getCurrent = async (req, res) => {
  const { user } = req;

  res.status(200).json({
    email: user.email,
    token: user.token,
    name: user.name,
    gender: user.gender,
    dailyNormal: user.dailyNormal,
    avatar: user.avatar,
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
      throw HttpError(409, `User with email: ${newEmail} already exist`);
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
    name: newUser.name,
    email: newUser.email,
    gender: newUser.gender,
  });
};

//? ===  Upload User Avatar ===

const uploadAvatar = async (req, res) => {
  const { _id } = req.user;

  if (!req.file) {
    throw HttpError(409, `Please add your avatar!`);
  }
  const { path: tempUpload } = req.file;

  if (!pictureFormat.some((el) => tempUpload.includes(el))) {
    throw HttpError(400, `File format doesn't supported`);
  }

  const avatar = await setAvatar(tempUpload);

  await User.findByIdAndUpdate(_id, { avatar });

  res.status(200).json({
    avatar,
  });
};

//? ===  Upload Water Rate ===

const editWaterRate = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const newUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  res.status(200).json({
    dailyNormal: newUser.dailyNormal,
  });
};

module.exports = {
  getCurrent: controllerWrapper(getCurrent),
  userUpdate: controllerWrapper(userUpdate),
  uploadAvatar: controllerWrapper(uploadAvatar),
  editWaterRate: controllerWrapper(editWaterRate),
};
