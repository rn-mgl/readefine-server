const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/words/wordsController");

router.route("/").get(controller.getAllWords);
router.route("/random_word").get(controller.getRandomWord);

module.exports = router;
