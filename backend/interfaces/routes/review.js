const express = require("express");
const router = express.Router();

const ReviewController = require("../controllers/ReviewController");
router.get("/:estateId/users/:userId", ReviewController.get);
router.post("/:estateId/users", ReviewController.add);

const ReviewCountController = require("../controllers/ReviewCountController");
router.get("/:id/count", ReviewCountController.get);

const ReviewLikesOrderController = require("../controllers/ReviewLikesOrderController");
router.get("/:id/likes", ReviewLikesOrderController.get);
router.put("/:id/likes", ReviewLikesOrderController.update);

const ReviewRatingsController = require("../controllers/ReviewRatingsController");
router.get("/:id/ratings", ReviewRatingsController.get);

const ReviewTimeOrderController = require("../controllers/ReviewTimeOrderController");
router.get("/:id/time", ReviewTimeOrderController.get);

const ReviewUserLikeController = require("../controllers/ReviewUserLikeController");
router.post("/:estateId/users/:userId/likes", ReviewUserLikeController.add);

module.exports = router;
