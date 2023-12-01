const express = require("express");
const router = express.Router();

const { register } = require("../controllers/auth");
const { validateBody } = require("../middlewares/index.js");
const { schemas } = require("../models/user.js");

router.post("/register", validateBody(schemas.userJoiSchema), register);

module.exports = router;
