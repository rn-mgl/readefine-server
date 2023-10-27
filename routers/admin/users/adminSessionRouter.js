const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/users/adminSessionController");

router.route("/").post(controller.createSession);
router.route("/:admin_id").get(controller.getAdminSessions);

module.exports = router;
