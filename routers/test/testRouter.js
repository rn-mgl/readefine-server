const express = require("express");
const router = express.Router();
const controller = require("../../controllers/test/testController");

router.route("/").post(controller.createTest).get(controller.getAllTests);
router.route("/:test_id").get(controller.getTest).delete(controller.deleteTest);

module.exports = router;
