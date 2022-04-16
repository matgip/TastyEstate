const express = require("express");
const router = express.Router();

const LoginController = require("../controllers/LoginController");

router.post("/login", LoginController.socialLogin);
router.post("/logout", LoginController.logout);

module.exports = router;
