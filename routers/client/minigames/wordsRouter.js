const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/minigames/wordsController");

router.route("/").get(controller.getAllWords);
router.route("/:word_id").get(controller.getWord);

module.exports = router;
