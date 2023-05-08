const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/users/adminController");

router.route("/").get(controller.getAllAdmins);
router.route("/admin_email").get(controller.findWithEmail);
router.route("/:admin_id").get(controller.getAdmin);

module.exports = router;
