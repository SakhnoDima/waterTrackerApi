const { User } = require("../models/user");
const {
  controllerWrapper,
  HttpError,
  tokenCreator,
  stringifiedParams,
  getUserFromGoogle,
  userCreator,
  mailSenderTransport,
  passwordGenerator,
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

  // setting token

  const token = await tokenCreator({ id: newUser._id });

  newUser.token = token;
  // const userWithToken = await User.findByIdAndUpdate(user._id, { token });

  // saving user in base
  await newUser.save();

  res.status(201).json({
    email: newUser.email,
    avatar: newUser.avatar,
    token: token,
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

  // set session and save on data
  req.session.isAuth = true;

  res.status(200).json({
    email: userWithToken.email,
    avatar: userWithToken.avatar,
    name: userWithToken.name,
    token: token,
  });
};

//? ===  logOut ===

const logOut = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  // remove session from data
  //! нужна ошибка???????????????????????????
  req.session.destroy((err) => {
    if (err) {
      throw HttpError(401, err);
    }
  });
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

  const token = await userCreator(data);

  return res.redirect(`${process.env.FRONTEND_URL}/google?token=${token}`);
};

//? == Forgot password / mailSender ===

const mailSender = async (req, res) => {
  const { email } = req.body;

  // Is user exist
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, `User with email: ${email} not found`);
  }

  // Generate random password
  const newPass = await passwordGenerator();

  // Hashing password
  user.setPass(newPass);

  // Saving user in base
  await user.save();

  // Sending an email to a user with a new password
  const verifyEmail = {
    to: email,
    subject: "New password",
    text: "Updated password",
    html: `<div><h1>Water Tracker</h1>
    <p>Updated password : ${newPass}</p>
    </div>`,
  };

  await mailSenderTransport(verifyEmail);

  res.status(200).json({
    message: "New password sent successfully!",
  });
};

module.exports = {
  register: controllerWrapper(register),
  logIn: controllerWrapper(logIn),
  logOut: controllerWrapper(logOut),
  googleAuth: controllerWrapper(googleAuth),
  googleRedirect: controllerWrapper(googleRedirect),
  mailSender: controllerWrapper(mailSender),
};
