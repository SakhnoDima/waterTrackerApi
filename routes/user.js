const express = require("express");
const router = express.Router();

const { getCurrent, userUpdate } = require("../controllers/user");
const { validateBody } = require("../middlewares/index.js");
const { schemas } = require("../models/user.js");
const authenticate = require("../middlewares/isAuthenticate");

router.use(authenticate);

router.get("/current", getCurrent);
router.patch("/updateUser", validateBody(schemas.userUpdate), userUpdate);

module.exports = router;
