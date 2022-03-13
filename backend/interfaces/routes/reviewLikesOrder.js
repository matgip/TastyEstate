const express = require("express");
const router = express.Router();

const ReviewLikesOrderController = require("../controllers/ReviewLikesOrderController");

router.put("/:id/likes", ReviewLikesOrderController.add);

module.exports = router;
