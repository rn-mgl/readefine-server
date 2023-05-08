const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/achievements/userAchievementController");

router.route("/").post(controller.recieveAchievement);
router.route("/achievement_user").get(controller.getAllUserAchievements);
router.route("/:user_achievement_id").get(controller.getUserAchievement);

module.exports = router;
