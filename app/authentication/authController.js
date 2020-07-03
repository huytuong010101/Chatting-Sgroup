import knex from "../../database/pgConfig.js";
import { firebase, admin } from "../../firebase/fbConfig.js";
import bcrypt from 'bcrypt';
const saltRounds = 10;
import jwtDecode from 'jwt-decode';
import Users from "../user/userRepository.js"

const user = new Users;

export default class AuthController {
    //render some page
    renderEmailLoginPage(req, res) {
        return res.render("app/login", { title: req.flash("titleLogin") });
    }
    renderEmailRegisterPage = (req, res) => {
        return res.render("app/auth/register-email", { errors: req.flash("register-errors")[0] });
    }
    renderPhoneLoginPage(req, res) {
        return res.render("app/login-phone-number");
    }
    renderRegisterPage(req, res) {
        return res.render("app/auth/register");
    }
    //register by email
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
    //register by phone
    async addPhoneAccount(req, res) {
        let token = req.headers.token;
        let currentUser = await jwtDecode(token)
        const isExist = await user.get({ "uid": currentUser.user_id })
        if (!isExist) {
            await user.insert({
                uid: currentUser.user_id,
                phone: currentUser.phone_number,
                password: "notPassword",
                avatar: 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg',
            })
        }
        return res.json({
            result: "OK",
        })
    }
}
