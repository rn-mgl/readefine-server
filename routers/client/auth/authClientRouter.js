const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/auth/authClientController");

router.route("/client_verify").patch(controller.verifyUser);
router.route("/client_login").post(controller.logInUser);
router.route("/client_signup").post(controller.signUpUser);

module.exports = router;
