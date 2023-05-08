const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/answers/answeredDecipherController");

router.route("/").post(controller.createAnswer).get(controller.getAllAnsweredDeciphers);
router.route("/:decipher_id").get(controller.getAnsweredDecipher);

module.exports = router;
