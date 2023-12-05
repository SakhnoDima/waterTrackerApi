const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

// Mongoose schema

const waterSchema = new Schema({
  amount: {
    type: Number,
    max: 5000,
    required: [true, "Amount is required"],
  },
  time: {
    type: Date,
    required: [true, "Time is required"],
  },
  day: {
    type: Number,
    default: null,
  },
  month: {
    type: Number,
    default: null,
  },
  year: {
    type: Number,
    default: null,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

// Joi validation

const waterJoiSchema = Joi.object({
  amount: Joi.number().min(1).max(5000).required().messages({
    "number.base": `Amount - should be a number type!`,
    "number.empty": `Amount - cannot be an empty!`,
    "number.min": `Amount - can be minimum 1ml!`,
    "number.max": `Amount - can be maximum 5000ml!`,
    "any.required": `Amount is a required!`,
  }),
  time: Joi.date().required().messages({
    "time.bae": `Time - should be a date type!`,
    "time.empty": `Time - cannot be an empty!`,
    "time.required": `Time is a required!`,
  }),
});
const updateWaterJoiSchema = Joi.object({
  amount: Joi.number().min(1).max(5000).messages({
    "number.base": `Amount - should be a number type!`,
    "number.empty": `Amount - cannot be an empty!`,
    "number.min": `Amount - can be minimum 1ml!`,
    "number.max": `Amount - can be maximum 5000ml!`,
  }),
  time: Joi.date().messages({
    "time.bae": `Time - should be a date type!`,
    "time.empty": `Time - cannot be an empty!`,
  }),
});
const getWaterInfoMonthJoiSchema = Joi.object({
  date: Joi.date().required().messages({
    "time.bae": `Date - should be a date type!`,
    "time.empty": `Date - cannot be an empty!`,
    "any.required": `Date is a required!`,
  }),
});

waterSchema.post("save", handleMongooseError);

const Water = model("water", waterSchema);
const schemas = {
  waterJoiSchema,
  updateWaterJoiSchema,
  getWaterInfoMonthJoiSchema,
};

module.exports = { Water, schemas };
