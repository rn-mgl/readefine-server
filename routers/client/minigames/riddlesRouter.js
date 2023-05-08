const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/minigames/riddlesController");

router.route("/").get(controller.getAllRiddles);
router.route("/:riddle_id").get(controller.getRiddle);

module.exports = router;
