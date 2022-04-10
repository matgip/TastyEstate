const express = require("express");
const router = express.Router();

const ReviewTimeOrderController = require("../controllers/ReviewTimeOrderController");

router.get("/:id/time", ReviewTimeOrderController.get);
router.post("/:id/time", ReviewTimeOrderController.add);

module.exports = router;
