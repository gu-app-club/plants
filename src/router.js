// TODO
const express = require("express");
const router = express.Router();
const authController = require("./controller/auth/authController.js");

router.get("/login", authController.login);
router.get("/signup", authController.signup);
router.get("/database", authController.database);

module.exports = router;
