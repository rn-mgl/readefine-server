const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/minigames/dailyDecipherController");

router.route("/:decipher_id").get(controller.getDailyDecipher);

module.exports = router;
