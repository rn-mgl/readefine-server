const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/head/auth/authHeadController");

router.route("/head_verify").patch(controller.verifyHead);
router.route("/head_login").post(controller.logInHead);
router.route("/head_signup").post(controller.signUpHead);

module.exports = router;
