const express = require("express");

const router = express.Router();

const {
  validateBody,
  isValidId,
  isAuthenticate,
  isWaterOwner,
} = require("../middlewares/index.js");
const { schemas } = require("../models/water.js");
const {
  setWaterData,
  updateWater,
  removeWaterInfo,
  getWaterToday,
  getWaterPerMonth,
} = require("../controllers/water.js");

router.use(isAuthenticate);

router.post("/", validateBody(schemas.waterJoiSchema), setWaterData);
router.delete("/:waterId", isValidId, isWaterOwner, removeWaterInfo);
router.patch(
  "/:waterId",
  isValidId,
  isWaterOwner,
  validateBody(schemas.updateWaterJoiSchema),
  updateWater
);
router.get("/today", getWaterToday);
router.get("/month/info", getWaterPerMonth);

module.exports = router;
