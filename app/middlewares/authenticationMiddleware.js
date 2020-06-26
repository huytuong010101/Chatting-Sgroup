const { knex } = require("../../database/pgConfig");
const { firebase, admin } = require("../../firebase/fbConfig");
const { json } = require("express");

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

const verifyToken = async (req, res, next) => {
    try {
        await admin.auth().verifyIdToken(req.headers.token);
    } catch (e) {
        return res.json({
            result: "not OK",
            error: "Lỗi xác thực",
        })
    }
    return next()
}


module.exports = {
    validateRegistration,
    verifyToken,
}