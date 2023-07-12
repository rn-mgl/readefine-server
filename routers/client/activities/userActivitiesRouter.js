const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/activities/userActivitiesController");

router.route("/:user_id").get(controller.getAllUserActivities);

module.exports = router;
