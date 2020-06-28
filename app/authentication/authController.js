import knex from "../../database/pgConfig.js";
import { firebase, admin } from "../../firebase/fbConfig.js";
import bcrypt from 'bcrypt';
const saltRounds = 10;
import jwtDecode from 'jwt-decode';
import User from "../user/userModel.js"

const user = new User;

export default class AuthController {
    renderEmailLoginPage(req, res) {
        return res.render("app/login", { title: req.flash("titleLogin") });
    }
    renderEmailRegisterPage = (req, res) => {
        return res.render("app/auth/register-email", { errors: req.flash("register-errors")[0] });
    }
    async handleRegister(req, res) {
        try {
            let infoUser = await admin.auth().createUser({
                email: req.body.email,
                emailVerified: false,
                password: req.body.password,
                displayName: req.body.lastName + " " + req.body.firstName,
                photoURL: 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg',
                disabled: false
            })
            await user.insert({
                uid: infoUser.uid,
                email: infoUser.email,
                fullname: infoUser.displayName,
                phone: infoUser.phoneNumber,
                avatar: infoUser.photoURL,
                password: bcrypt.hashSync(req.body.password, saltRounds),
            })
        } catch (e) {
            req.flash("register-errors", { title: "Đã có lỗi xảy ra!" })
            return res.redirect("/auth/resgister");
        }

        req.flash("titleLogin", "Resgistration is success");
        return res.redirect("/auth/login-email");
    }
    async handleLogout(req, res) {
        await firebase.auth().signOut();
        req.flash("titleLogin", "Ok, you can login again");
        return res.redirect("/auth/login-email");
    }
    renderPhoneLoginPage(req, res) {
        return res.render("app/login-phone-number");
    }
    renderRegisterPage(req, res) {
        return res.render("app/auth/register");
    }
    async verifyToken(token) {
        try {
            await admin.auth().verifyIdToken(token);
        } catch (e) {
            return false
        }
        return true
    }
    async addPhoneAccount(req, res) {
        let token = req.headers.token;
        let user = await jwtDecode(token)
        isExist = await user.get({ "uid": user.user_id })
        if (!isExist) {
            await user.insert({
                uid: user.user_id,
                phone: user.phone_number,
                password: "notPassword",
                avatar: 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg',
            })
        }
        return res.json({
            result: "OK",
        })
    }
}
