const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/answers/answeredDangleController");

router.route("/").post(controller.createAnswer).get(controller.getAllAnsweredDangles);
router.route("/:dangle_id").get(controller.getAnsweredDangle);

module.exports = router;
