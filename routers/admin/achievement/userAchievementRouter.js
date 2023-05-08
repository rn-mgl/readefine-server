const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/achievements/userAchievementController");

router.route("/").post(controller.recieveAchievement);
router.route("/achievement_admin").get(controller.getAllAchievements);
router.route("/achievement_user").get(controller.getAllUserAchievements);
router.route("/:user_achievement_id").get(controller.getAchievement);

module.exports = router;
