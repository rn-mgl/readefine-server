const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/test/takenTestController");

router.route("/").get(controller.getAllTakenTests).post(controller.takeTest);
router.route("/:taken_id").get(controller.getTakenTest);

module.exports = router;
