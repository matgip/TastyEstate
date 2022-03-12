const express = require("express");
const router = express.Router();

const ReviewController = require("../controllers/ReviewController");

router.get("/:estateId/users/:userId", ReviewController.getReview);
router.post("/:estateId/users", ReviewController.addReview);

module.exports = router;
