const { knex } = require("../../database/pgConfig");
const { firebase, admin } = require("../../firebase/fbConfig");

const validateRegistration = async (req, res, next) => {
    let errors = { title: "Please check again" };
    let hasError = false;
    if (!req.body.firstName) {
        errors.fistName = "First name field is not valid";
        hasError = true;
    }
    if (!req.body.lastName) {
        errors.lastName = "Last name field is not valid";
        hasError = true;
    }
    if (req.body.password.length < 6) {
        errors.password = "Password is too short";
        hasError = true;
    }
    let isExistEmail = true;
    await admin.auth().getUserByEmail(req.body.email)
        .then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            isExistEmail = true;
        })
        .catch(function (error) {
            isExistEmail = false;
        });
    if (isExistEmail) {
        errors.email = "Email is exist";
        hasError = true;
    }
    req.flash("register-errors", errors);
    if (hasError) return res.redirect("/auth/register")
    return next();
}

const requireLogin = async (req, res, next) => {
    let user = firebase.auth().currentUser;
    if (user) return next();
    req.flash("titleLogin", "You must login first");
    return res.redirect("/auth");
}

const hasLogined = async (req, res, next) => {
    let user = firebase.auth().currentUser;
    if (!user) return next();
    return res.send("You have logined,go to /auth/logout to log out");
}

module.exports = {
    validateRegistration,
    hasLogined,
    requireLogin,
}