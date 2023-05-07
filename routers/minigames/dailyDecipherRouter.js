const express = require("express");
const router = express.Router();
const controller = require("../../controllers/minigames/dailyDecipherController");

router.route("/").post(controller.createDecipher).get(controller.getAllDailyDeciphers);
router
  .route("/:decipher_id")
  .delete(controller.deleteDecipher)
  .patch(controller.updateDecipher)
  .get(controller.getDailyDecipher);

module.exports = router;
