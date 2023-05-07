const express = require("express");
const router = express.Router();
const controller = require("../../controllers/minigames/dailyDangleController");

router.route("/").post(controller.createDangle).get(controller.getAllDailyDangles);
router
  .route("/:dangle_id")
  .delete(controller.deleteDangle)
  .patch(controller.updateDangle)
  .get(controller.getDailyDangle);

module.exports = router;
