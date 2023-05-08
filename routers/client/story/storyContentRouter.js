const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/story/storyContentController");

router.route("/").get(controller.getAllContent);
router.route("/:content_id").get(controller.getContent);

module.exports = router;
