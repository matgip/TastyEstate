const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/UsersController");

router.get("/:id", UsersController.getUser);
router.post("/", UsersController.addUser);

module.exports = router;
