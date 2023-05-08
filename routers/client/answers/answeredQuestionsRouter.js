const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/answers/answeredQuestionController");

router.route("/").post(controller.createAnswer).get(controller.getAllAnsweredQuestions);
router.route("/:answer_id").get(controller.getAnsweredQuestion);

module.exports = router;
