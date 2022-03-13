const express = require("express");
const router = express.Router();

const EstateController = require("../controllers/EstateController");

router.get("/:id", EstateController.get);
router.post("/", EstateController.add);

module.exports = router;
