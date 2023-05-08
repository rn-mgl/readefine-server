const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/test/testAnswerController");

router.route("/").get(controller.getAllAnswers);
router.route("/:answer_id").get(controller.getAnswer);

module.exports = router;
