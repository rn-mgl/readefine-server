const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/test/takenTestController");

router.route("/").get(controller.getTakenTest).post(controller.takeTest);

module.exports = router;
