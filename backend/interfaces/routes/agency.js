const express = require("express");
const router = express.Router();

const agencyController = require("../controllers/AgencyController");

router.get("/search", agencyController.search);
router.get("/:id", agencyController.get);
router.post("/", agencyController.add);

module.exports = router;
