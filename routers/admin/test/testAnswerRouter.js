const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/test/testAnswerController");

router.route("/").patch(controller.createAnswer).get(controller.getAllAnswers);
router
  .route("/:answer_id")
  .patch(controller.updateAnswer)
  .delete(controller.deleteAnswer)
  .get(controller.getAnswer);

module.exports = router;
