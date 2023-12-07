const express = require("express");
const router = express.Router();

const {
  register,
  logIn,
  logOut,
  googleAuth,
  googleRedirect,
  mailSender,
} = require("../controllers/auth");
const { validateBody, isAuthenticate } = require("../middlewares/index.js");
const { schemas } = require("../models/user.js");

router.post("/register", validateBody(schemas.userJoiSchema), register);
router.post("/login", validateBody(schemas.userJoiSchema), logIn);
router.post("/logout", isAuthenticate, logOut);

router.get("/google", googleAuth);
router.get("/google-redirect", googleRedirect);

router.post("/forgot-password", validateBody(schemas.updateEmail), mailSender);

module.exports = router;
