const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/head/auth/passwordReset");

router.route("/").post(controller.sendPasswordReset);
router.route("/:head_token").post(controller.changePassword);

module.exports = router;
