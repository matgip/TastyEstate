const express = require("express");
const router = express.Router();

const EstateController = require("../controllers/EstateController");

router.get("/search", EstateController.search);
router.get("/:id", EstateController.get);
router.post("/", EstateController.add);

module.exports = router;
