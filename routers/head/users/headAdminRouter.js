const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/head/users/adminController");

router.route("/").get(controller.getAllAdmins);
router.route("/:admin_id").get(controller.getAdmin);

module.exports = router;
