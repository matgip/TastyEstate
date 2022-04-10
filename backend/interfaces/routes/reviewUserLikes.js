const express = require("express");
const router = express.Router();

const ReviewUserLikeController = require("../controllers/ReviewUserLikeController");

router.post("/:estateId/users/:userId/likes", ReviewUserLikeController.add);

module.exports = router;
