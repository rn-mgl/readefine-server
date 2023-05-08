const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/story/readStoryController");

router.route("/").post(controller.createReadStory);

module.exports = router;
