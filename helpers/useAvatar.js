const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;

const options = {
  use_filename: true,
  unique_filename: true,
  overwrite: true,
  folder: "avatar",
  format: "jpg",
  width: 100,
  height: 100,
};

const setAvatar = async (avatarPath) => {
  try {
    const result = await cloudinary.uploader.upload(avatarPath, options);
    fs.unlink(avatarPath);
    return result.url;
  } catch (error) {
    return error;
  }
};

module.exports = setAvatar;
