const { knex } = require("../../database/pgConfig");
const { firebase, admin } = require("../../firebase/fbConfig");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtDecode = require('jwt-decode');

const renderEmailLoginPage = async (req, res) => {
    return res.render("app/login", { title: req.flash("titleLogin") });
}

const renderEmailRegisterPage = (req, res) => {
    return res.render("app/auth/register-email", { errors: req.flash("register-errors")[0] });
}

const handleRegister = async (req, res) => {
    try {
        let infoUser = await admin.auth().createUser({
            email: req.body.email,
            emailVerified: false,
            password: req.body.password,
            displayName: req.body.lastName + " " + req.body.firstName,
            photoURL: 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg',
            disabled: false
        })
        await knex("users").insert({
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

const handleLogout = async (req, res) => {
    await firebase.auth().signOut();
    req.flash("titleLogin", "Ok, you can login again");
    return res.redirect("/auth/login-email");
}

const renderPhoneLoginPage = (req, res) => {
    return res.render("app/login-phone-number");
}

const renderRegisterPage = (req, res) => {
    return res.render("app/auth/register");
}

const verifyToken = async (token) => {
    try {
        await admin.auth().verifyIdToken(token);
    } catch (e) {
        return false
    }
    return true
}

const addPhoneAccount = async (req, res) => {
    let token = req.headers.token;
    let user = await jwtDecode(token)
    isExist = await knex("users").select("*").where("uid", "=", user.user_id).first()
    if (!isExist) {
        await knex("users").insert({
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


module.exports = {
    renderEmailLoginPage,
    renderEmailRegisterPage,
    handleRegister,
    handleLogout,
    renderPhoneLoginPage,
    renderRegisterPage,
    verifyToken,
    addPhoneAccount,
}