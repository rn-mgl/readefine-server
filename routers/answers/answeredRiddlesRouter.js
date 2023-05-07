const express = require("express");
const router = express.Router();
const controller = require("../../controllers/answers/answeredRiddlesController");

router.route("/").post(controller.createAnswer).get(controller.getAllAnsweredRiddles);
router.route("/:riddle_id").get(controller.getAnsweredRiddle);

module.exports = router;
