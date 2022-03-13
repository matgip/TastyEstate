const express = require("express");
const router = express.Router();

const ReviewCountController = require("../controllers/ReviewCountController");

router.get("/:id/count", ReviewCountController.get);

module.exports = router;
