const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/minigames/minigameDashboardController");

router.route("/").get(controller.getAllPlayCounts);

module.exports = router;
