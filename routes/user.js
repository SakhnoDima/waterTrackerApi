const express = require("express");
const router = express.Router();

const { getCurrent } = require("../controllers/user");

const authenticate = require("../middlewares/isAuthenticate");

router.use(authenticate);

router.get("/current", getCurrent);

module.exports = router;
