const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/achievements/rewardController");

router.route("/").get(controller.getAllRewards);
router.route("/:reward_id").get(controller.getReward);

module.exports = router;
