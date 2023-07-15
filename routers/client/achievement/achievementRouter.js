const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/achievements/achievementController");

router.route("/").get(controller.getAllUserAchievements);

module.exports = router;
