const express = require("express");
const router = express.Router();

const ReviewRatingsController = require("../controllers/ReviewRatingsController");

router.get("/:id/ratings", ReviewRatingsController.get);
router.put("/:id/ratings", ReviewRatingsController.add);

module.exports = router;
