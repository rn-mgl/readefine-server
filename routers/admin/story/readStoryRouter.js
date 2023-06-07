const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/story/readStoryController");

router.route("/").post(controller.createReadStory).get(controller.getReadStories);

module.exports = router;
