const { User } = require("../models/user");
const {
  controllerWrapper,
  HttpError,
  tokenCreator,
  stringifiedParams,
  getUserFromGoogle,
  userCreator,
} = require("../helpers");

//? ===  register ===

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // is email already in use

  if (user) {
    throw HttpError(409, "Email is already in use");
  }

  // create user
  const newUser = new User({ email });

  // hashing password
  newUser.setPass(password);

  // saving user in base
  await newUser.save();

  res.status(201).json({
    message: "Register is successfully!",
  });
};

//? ===  logIn ===

const logIn = async (req, res) => {
  const { email, password } = req.body;

  // trying to find user

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  // comparison of passwords for validity

  const validPass = user.validPassword(password);

  if (!validPass) {
    throw HttpError(401, "Email or password is wrong");
  }

  // setting token

  const token = await tokenCreator({ id: user._id });

  const userWithToken = await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    user: {
      email: userWithToken.email,
      avatar: userWithToken.avatar,
      token: token,
    },
  });
};

//? ===  logOut ===

const logOut = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  res.status(200).json({
    message: "User successfully logout",
  });
};

//? === Google auth ===

const googleAuth = async (req, res) => {
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

//? == Google redirect ===

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const { data } = await getUserFromGoogle(fullUrl);
  console.log(data);
  const token = await userCreator(data);
  console.log(token);
  // return res.redirect(
  //   `${process.env.FRONTEND_URL}?token=${token}`
  // );
};

module.exports = {
  register: controllerWrapper(register),
  logIn: controllerWrapper(logIn),
  logOut: controllerWrapper(logOut),
  googleAuth: controllerWrapper(googleAuth),
  googleRedirect: controllerWrapper(googleRedirect),
};
