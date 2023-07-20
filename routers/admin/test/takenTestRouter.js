const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/test/takenTestController");

router.route("/").post(controller.takeTest).get(controller.getTakenTestsOfUser);
router.route("/:taken_id").get(controller.takeTest);

module.exports = router;
