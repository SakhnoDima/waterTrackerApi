const express = require("express");
const router = express.Router();

const { register, logIn } = require("../controllers/auth");
const { validateBody } = require("../middlewares/index.js");
const { schemas } = require("../models/user.js");

router.post("/register", validateBody(schemas.userJoiSchema), register);
router.post("/login", validateBody(schemas.userJoiSchema), logIn);

module.exports = router;
