const { User } = require("../models/user");
const { tokenCreator } = require("./tokenWorkPlace");

const userCreator = async (data) => {
  const { id, email, name } = data;
  console.log(name);
  const currentUser = await User.findOne({ email });

  if (!currentUser) {
    const newUser = new User({ email, name });
    newUser.setPass(id);
    newUser.save();

    const token = await tokenCreator({ id: newUser._id });
    await User.findByIdAndUpdate(newUser._id, { token });
    return token;
  }

  const token = await tokenCreator({ id: currentUser._id });
  await User.findByIdAndUpdate(currentUser._id, { token });
  return token;
};

module.exports = userCreator;
