const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/head/users/headSessionController");

router.route("/").post(controller.createSession);

module.exports = router;
