const express = require("express");
const router = express.Router();

const ReviewController = require("../controllers/ReviewController");

router.get("/:estateId/users/:userId", ReviewController.get);
router.post("/:estateId/users", ReviewController.add);

module.exports = router;
