const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/minigames/riddlesController");

router.route("/").get(controller.getRandomRiddle);

module.exports = router;
