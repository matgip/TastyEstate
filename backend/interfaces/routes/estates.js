const express = require("express");
const router = express.Router();

const EstateController = require("../controllers/EstateController");

router.get("/:id", EstateController.getEstate);
router.post("/", EstateController.addEstate);

module.exports = router;
