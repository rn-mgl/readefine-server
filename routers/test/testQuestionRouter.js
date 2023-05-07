const express = require("express");
const router = express.Router();
const controller = require("../../controllers/test/testQuestionController");

router.route("/").post(controller.createQuestion).get(controller.getAllQuestions);
router
  .route("/:question_id")
  .patch(controller.updateQuestion)
  .delete(controller.deleteQuestion)
  .get(controller.getQuestion);

module.exports = router;
