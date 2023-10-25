const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/head/users/headAdminActivitiesController");

router.route("/").get(controller.getAllAdminActivity);

module.exports = router;
