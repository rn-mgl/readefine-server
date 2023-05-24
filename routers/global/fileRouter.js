const controller = require("../../controllers/global/fileController");
const express = require("express");
const router = express.Router();

router.route("/admin_file").post(controller.uploadAdminFile);
router.route("/client_file").post(controller.uploadClientFile);

module.exports = router;
