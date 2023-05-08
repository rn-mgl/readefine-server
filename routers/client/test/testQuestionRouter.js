const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/test/testQuestionController");

router.route("/").get(controller.getAllQuestions);
router.route("/:question_id").get(controller.getQuestion);

module.exports = router;
