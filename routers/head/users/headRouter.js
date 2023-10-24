const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/head/users/headController");

router.route("/").get(controller.getAllHeads);
router.route("/head_email").get(controller.findWithEmail);
router.route("/:head_id").get(controller.getHead).patch(controller.updateHead);

module.exports = router;
