const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/client/users/userController");

router.route("/client_email").get(controller.findWithEmail);
router.route("/:user_id").get(controller.getUser).patch(controller.updateUser);

module.exports = router;
