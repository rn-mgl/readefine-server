const controller = require("../../../controllers/head/dashboard/dashboardController");
const express = require("express");
const router = express.Router();

router.route("/").get(controller.getDashboardData);

module.exports = router;
