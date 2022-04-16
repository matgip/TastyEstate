const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.post("/login", UserController.socialLogin);
router.post("/logout", UserController.logout);
router.get("/me", UserController.get);

module.exports = router;
