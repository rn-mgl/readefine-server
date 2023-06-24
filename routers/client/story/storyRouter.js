const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/story/storyController");

router.route("/").get(controller.getAllUserStories);
router.route("/:story_id").get(controller.getStory);

module.exports = router;
