const express = require("express");
const router = express.Router();
const controller = require("../../controllers/achievements/rewardController");

router.route("/").post(controller.createReward).get(controller.getAllRewards);
router
  .route("/:reward_id")
  .patch(controller.updateReward)
  .delete(controller.deleteReward)
  .get(controller.getReward);

module.exports = router;
