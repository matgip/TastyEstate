const express = require("express");
const router = express.Router();

const ReviewRatingsController = require("../controllers/ReviewRatingsController");

router.put("/:id/ratings", ReviewRatingsController.add);
router.get("/:id/ratings", ReviewRatingsController.get);

module.exports = router;
