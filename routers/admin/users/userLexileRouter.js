const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/users/userLexileController");

router.route("/").get(controller.getLexileProgress);

module.exports = router;
