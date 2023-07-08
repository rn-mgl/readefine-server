const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/minigames/riddlesController");

router.route("/").post(controller.createRiddle).get(controller.getAllRiddles);
router.route("/random_riddle").get(controller.getRandomRiddle);
router
  .route("/:riddle_id")
  .patch(controller.updateRiddle)
  .delete(controller.deleteRiddle)
  .get(controller.getRiddle);

module.exports = router;
