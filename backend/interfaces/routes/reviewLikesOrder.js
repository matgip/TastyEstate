const express = require("express");
const router = express.Router();

const ReviewLikesOrderController = require("../controllers/ReviewLikesOrderController");

router.get("/:id/likes", ReviewLikesOrderController.get);
router.post("/:id/likes", ReviewLikesOrderController.add);
router.put("/:id/likes", ReviewLikesOrderController.update);

module.exports = router;
