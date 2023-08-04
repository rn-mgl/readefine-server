const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/auth/passwordReset");

router.route("/").post(controller.sendPasswordReset);
router.route("/:token").post(controller.changePassword);

module.exports = router;
