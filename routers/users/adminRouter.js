const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/users/adminController");

router.route("/").get(adminController.getAllAdmins);
router.route("/admin_email").get(adminController.findWithEmail);
router.route("/:admin_id").get(adminController.getAdmin);

module.exports = router;
