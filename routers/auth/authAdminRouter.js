const express = require("express");
const router = express.Router();
const controller = require("../../controllers/auth/authAdminController");

router.route("/admin_verify").patch(controller.verifyAdmin);
router.route("/admin_login").patch(controller.logInAdmin);
router.route("/admin_signup").patch(controller.signUpAdmin);

module.exports = router;
