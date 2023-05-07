const express = require("express");
const router = express.Router();
const controller = require("../../controllers/auth/authClientController");

router.route("/client_verify").patch(controller.verifyUser);
router.route("/client_login").patch(controller.logInUser);
router.route("/client_signup").patch(controller.signUpUser);

module.exports = router;
