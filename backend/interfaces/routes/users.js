const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/UsersController");

router.get("/:id", UsersController.get);
router.post("/", UsersController.add);

module.exports = router;
