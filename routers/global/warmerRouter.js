const express= require("express");
const router = express.Router();
const controller = require("../../controllers/global/warmerController")

router.route("/").get(controller.getUserCount);

module.exports = router