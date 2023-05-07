const express = require("express");
const router = express.Router();
const controller = require("../../controllers/story/storyContentController");

router.route("/").post(controller.createContent).get(controller.getAllContent);
router
  .route("/:content_id")
  .patch(controller.updateContent)
  .delete(controller.deleteContent)
  .get(controller.getContent);

module.exports = router;
