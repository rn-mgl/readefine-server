const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/test/testController");

router.route("/").post(controller.createTest).get(controller.getAllTests);
router
  .route("/:test_id")
  .get(controller.getTest)
  .delete(controller.deleteTest)
  .patch(controller.updateTest);

module.exports = router;
