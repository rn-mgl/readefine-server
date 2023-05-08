const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/test/testController");

router.route("/").get(controller.getAllTests);
router.route("/:test_id").get(controller.getTest);

module.exports = router;
