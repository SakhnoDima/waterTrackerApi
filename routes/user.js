const express = require("express");
const router = express.Router();

const {
  getCurrent,
  userUpdate,
  uploadAvatar,
  editWaterRate,
} = require("../controllers/user");

const { validateBody, upload } = require("../middlewares/index.js");
const { schemas } = require("../models/user.js");
const authenticate = require("../middlewares/isAuthenticate");

router.use(authenticate);

router.get("/current", getCurrent);
router.patch("/updateUser", validateBody(schemas.userUpdate), userUpdate);
router.patch("/updateAvatar", upload.single("file"), uploadAvatar);
router.patch(
  "/updateWaterRate",
  validateBody(schemas.updateWaterRate),
  editWaterRate
);

module.exports = router;
