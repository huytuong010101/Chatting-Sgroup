const express = require('express');
const router = express.Router();
const handleAuth = require("../app/controllers/authController");
const middlewareAuth = require("../app/middlewares/authenticationMiddleware");

router.route("/login-email")
    .get(handleAuth.renderEmailLoginPage)
router.route("/add-phone-account")
    .post(middlewareAuth.verifyToken, handleAuth.addPhoneAccount)

router.route("/email-register")
    .get(handleAuth.renderEmailRegisterPage)
    .post(middlewareAuth.validateRegistration, handleAuth.handleRegister);

router.route("/register")
    .get(handleAuth.renderRegisterPage)
router.route("/login-phone")
    .get(handleAuth.renderPhoneLoginPage)
router.route("/verify-token")
    .post(handleAuth.verifyToken)
router.route("/logout")
    .get((req, res) => {
        return res.render("app/logout")
    })

module.exports = router;
