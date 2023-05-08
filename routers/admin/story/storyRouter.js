const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/story/storyController");

router.route("/").post(controller.createStory).get(controller.getAllStories);
router
  .route("/:story_id")
  .patch(controller.updateStory)
  .delete(controller.deleteStory)
  .get(controller.getStory);

module.exports = router;
