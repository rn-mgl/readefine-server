const express = require("express");
const router = express.Router();
const controller = require("../../controllers/minigames/wordsController");

router.route("/").post(controller.createWord).get(controller.getAllWords);
router
  .route("/:word_id")
  .patch(controller.updateWord)
  .delete(controller.deleteWord)
  .get(controller.getWord);

module.exports = router;
