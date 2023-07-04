const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/words/wordsController");

router.route("/").post(controller.addWord).get(controller.getAllWords);
router.route("/random").get(controller.getRandomWord);

module.exports = router;
