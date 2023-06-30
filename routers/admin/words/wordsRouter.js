const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/words/wordsController");

router.route("/").post(controller.addWord).get(controller.getAllWords);

module.exports = router;
