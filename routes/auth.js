const express = require("express");
const router = express.Router();

const { register, logIn, logOut } = require("../controllers/auth");
const { validateBody, isAuthenticate } = require("../middlewares/index.js");
const { schemas } = require("../models/user.js");

router.post("/register", validateBody(schemas.userJoiSchema), register);
router.post("/login", validateBody(schemas.userJoiSchema), logIn);
router.post("/logout", isAuthenticate, logOut);

module.exports = router;
