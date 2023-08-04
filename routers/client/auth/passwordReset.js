const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/auth/passwordReset");

router.route("/").post(controller.sendPasswordReset);
router.route("/:client_token").post(controller.changePassword);

module.exports = router;
