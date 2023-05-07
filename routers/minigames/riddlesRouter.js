const express = require("express");
const router = express.Router();
const controller = require("../../controllers/minigames/riddlesController");

router.route("/").post(controller.createRiddle).get(controller.getAllRiddles);
router
  .route("/:riddle_id")
  .patch(controller.updateRiddle)
  .delete(controller.deleteRiddle)
  .get(controller.getRiddle);

module.exports = router;
