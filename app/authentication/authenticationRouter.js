import express from 'express';
const router = express.Router();
import AuthController from "./authController.js";
import AuthMiddleware from "../middlewares/authenticationMiddleware.js";

const authController = new AuthController
const authMiddleware = new AuthMiddleware

router.route("/login-email")
    .get(authController.renderEmailLoginPage)
router.route("/add-phone-account")
    .post(authMiddleware.verifyToken, authController.addPhoneAccount)
router.route("/email-register")
    .get(authController.renderEmailRegisterPage)
    .post(authMiddleware.validateRegistration, authController.handleRegister);
router.route("/register")
    .get(authController.renderRegisterPage)
router.route("/login-phone")
    .get(authController.renderPhoneLoginPage)
router.route("/logout")
    .get((req, res) => {
        return res.render("app/logout")
    })

export default router;
