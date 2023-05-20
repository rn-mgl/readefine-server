const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/users/userController");

router.route("/").get(controller.getAllUsers);
router.route("/client_email").get(controller.findWithEmail);
router.route("/:user_id").get(controller.getUser);

module.exports = router;
