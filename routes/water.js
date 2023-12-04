const express = require("express");
const authenticate = require("../middlewares/isAuthenticate");

const router = express.Router();

const { validateBody, isValidId } = require("../middlewares/index.js");
const { schemas } = require("../models/water.js");
const {
  setWaterData,
  updateWater,
  removeWaterInfo,
} = require("../controllers/water.js");

router.use(authenticate);

router.post("/", validateBody(schemas.waterJoiSchema), setWaterData);
router.delete("/:waterId", isValidId, removeWaterInfo);
router.patch(
  "/:waterId",
  isValidId,
  validateBody(schemas.updateWaterJoiSchema),
  updateWater
);

module.exports = router;
