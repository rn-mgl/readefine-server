const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/activities/adminActivitiesController");

router.route("/").post(controller.createAdminActivity).get(controller.getAllAdminActivity);
router.route("/:admin_id").get(controller.getAllAdminActivities);

module.exports = router;
