const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/minigames/dailyDangleController");

router.route("/:dangle_id").get(controller.getDailyDangle);

module.exports = router;
