const { knex } = require("../../database/pgConfig");
const { firebase, admin } = require("../../firebase/fbConfig");

const renderLoginPage = async (req, res) => {
    return res.render("app/login", { title: req.flash("titleLogin") });
}

const renderRegisterPage = (req, res) => {
    return res.render("app/auth/register-email", { errors: req.flash("register-errors")[0] });
}

const handleRegister = (req, res) => {
    try {
        admin.auth().createUser({
            email: req.body.email,
            emailVerified: false,
            password: req.body.password,
            displayName: req.body.lastName + req.body.firstName,
            photoURL: 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg',
            disabled: false
        })
    } catch (e) {
        req.flash("register-errors", { title: "Đã có lỗi xảy ra!" })
        return res.redirect("/auth/resgister");
    }
    req.flash("titleLogin", "Resgistration is success");
    return res.redirect("/auth");
}

const handleLogin = async (req, res) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password);
    } catch (e) {
        req.flash("titleLogin", "The email or password is wrong!");
        return res.redirect("/auth");
    }
    return res.send("Login suceess, goto /auth/logout to logout");
}

const handleLogout = async (req, res) => {
    await firebase.auth().signOut();
    req.flash("titleLogin", "Ok, you can login again");
    return res.redirect("/auth");
}

module.exports = {
    renderLoginPage,
    renderRegisterPage,
    handleRegister,
    handleLogin,
    handleLogout,
}