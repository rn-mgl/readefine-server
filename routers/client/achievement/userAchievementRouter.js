const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/achievements/userAchievementController");

router
  .route("/")
  .post(controller.receiveAchievement)
  .get(controller.getAllUserAchievements)
  .patch(controller.updateUserAchievements);

router.route("/:user_achievement_id").get(controller.getUserAchievement);

module.exports = router;
