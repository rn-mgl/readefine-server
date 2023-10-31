const controller = require("../../../controllers/head/files/fileController");
const express = require("express");
const router = express.Router();

router.route("/").post(controller.uploadFile);

module.exports = router;
