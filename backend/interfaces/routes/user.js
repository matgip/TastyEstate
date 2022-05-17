
const { jwtMiddleware } = require("../../utils/jwt");

const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");


router.post("/login", UserController.socialLogin);
router.post("/logout", jwtMiddleware, UserController.logout);
router.get("/me", jwtMiddleware, UserController.get);

module.exports = router;
