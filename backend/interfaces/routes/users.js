const express = require("express");
const router = express.Router();

const { verifyToken } = require("../../utils/jwt");

const UsersController = require("../controllers/UsersController");

router.get("/:id", verifyToken, UsersController.get);
router.post("/", verifyToken, UsersController.add);

module.exports = router;
