const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/test/takenTestController");

router.route("/").post(controller.takeTest).get(controller.getAllTakenTests);
router.route("/:taken_id").get(controller.takeTest);

module.exports = router;
