const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/story/storyController");

router.route("/").get(controller.getAllStories);
router.route("/:story_id").get(controller.getStory);

module.exports = router;
