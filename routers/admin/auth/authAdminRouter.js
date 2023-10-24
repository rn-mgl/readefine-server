const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/auth/authAdminController");

router.route("/admin_verify").patch(controller.verifyAdmin);
router.route("/admin_login").post(controller.logInAdmin);

module.exports = router;
