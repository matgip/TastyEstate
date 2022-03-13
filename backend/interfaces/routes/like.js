const express = require("express");
const router = express.Router();

const LikesController = require("../controllers/LikeController");

router.get("/:id", LikesController.get);
router.put("/:id", LikesController.add);

module.exports = router;
