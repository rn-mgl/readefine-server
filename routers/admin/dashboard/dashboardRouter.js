const controller = require("../../../controllers/admin/dashboard/dashboardController");
const express = require("express");
const router = express.Router();

router.route("/").get(controller.getDashboardData);

module.exports = router;
