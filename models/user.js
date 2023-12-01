const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");
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

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);
const schemas = { userJoiSchema };

module.exports = { User, schemas };