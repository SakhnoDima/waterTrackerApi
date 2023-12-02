const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bCrypt = require("bcrypt");

const handleMongooseError = require("../helpers/handleMongooseError");
const { emailRegex, gender } = require("../constant/constant");

// Mongoose schema

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 8,

      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: [...Object.values(gender)],
      default: null,
    },
    dailyNormal: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

userSchema.methods.setPass = function (password) {
  this.password = bCrypt.hashSync(password, 10);
};
userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

// Joi validation

const userJoiSchema = Joi.object({
  password: Joi.string().min(8).max(48).required().messages({
    "string.base": `Password - should be a string type!`,
    "string.empty": `Password - cannot be an empty!`,
    "string.min": `Password - should have a minimum 8 symbols length!`,
    "string.max": `Password should have a maximum 48 symbols length!`,
    "any.required": `Password is a required!`,
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.bae": `Email - should be a string type!`,
    "string.empty": `Email - cannot be an empty!`,
    "any.required": `Password is a required!`,
    "string.pattern.base": `Email - invalid pattern!`,
  }),
});

const userUpdate = Joi.object({
  password: Joi.string().min(8).max(48).messages({
    "string.base": `Password - should be a string type!`,
    "string.min": `Password - should have a minimum 8 symbols length!`,
    "string.max": `Password should have a maximum 48 symbols length!`,
  }),
  email: Joi.string().pattern(emailRegex).messages({
    "string.bae": `Email - should be a string type!`,
    "string.pattern.base": `Email - invalid pattern!`,
  }),
  name: Joi.string(),
  gender: Joi.string().valid(...Object.values(gender)),
});

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);
const schemas = { userJoiSchema, userUpdate };

module.exports = { User, schemas };
