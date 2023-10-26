const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/head/activities/headAdminActivitiesController");

router.route("/").get(controller.getAllAdminActivity);

module.exports = router;
