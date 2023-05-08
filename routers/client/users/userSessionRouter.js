const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/users/userSessionController");

router.route("/").post(controller.createSession);

module.exports = router;
