const express = require("express");
const router = express.Router();

const LikesController = require("../controllers/LikesController");

router.get("/:id", LikesController.getLikes);
router.put("/:id", LikesController.addLikes);

module.exports = router;
