const express = require("express");
const router = express.Router();

const ReviewLikesOrderController = require("../controllers/ReviewLikesOrderController");

router.get("/:id/likes", ReviewLikesOrderController.get);
router.put("/:id/likes", ReviewLikesOrderController.add);

module.exports = router;
