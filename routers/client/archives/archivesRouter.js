const controller = require("../../../controllers/client/archives/archivesController");
const express = require("express");
const router = express.Router();

router.route("/").get(controller.getSingleUserCounts);

module.exports = router;
