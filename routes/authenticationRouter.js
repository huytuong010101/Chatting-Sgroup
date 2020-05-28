const express = require('express');
const router = express.Router();
const handleAuth = require("../app/controllers/authController");
const middlewareAuth = require("../app/middlewares/authenticationMiddleware");

router.route("/")
    .get(middlewareAuth.hasLogined, handleAuth.renderLoginPage)
    .post(middlewareAuth.hasLogined, handleAuth.handleLogin);
router.route("/register")
    .get(handleAuth.renderRegisterPage)
    .post(middlewareAuth.validateRegistration, handleAuth.handleRegister);
router.route("/logout")
    .get(handleAuth.handleLogout);

module.exports = router;
