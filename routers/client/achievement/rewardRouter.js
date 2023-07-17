const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/achievements/rewardController");

router.route("/").get(controller.getAllUserRewards);
router.route("/:reward_id").get(controller.getUserReward);

module.exports = router;
