const express = require("express");
const router = express.Router();
const controller = require("../../controllers/achievements/achievementController");

router.route("/").post(controller.createAchievement).get(controller.getAllAchievements);
router
  .route("/:achievement_id")
  .patch(controller.updateAchievement)
  .delete(controller.deleteAchievement)
  .get(controller.getAchievement);

module.exports = router;
