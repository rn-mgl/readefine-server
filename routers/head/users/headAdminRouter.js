const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/head/users/headAdminController");

router.route("/").get(controller.getAllAdmins).post(controller.signUpAdmin);
router.route("/:admin_id").get(controller.getAdmin).delete(controller.deleteAdmin);

module.exports = router;
