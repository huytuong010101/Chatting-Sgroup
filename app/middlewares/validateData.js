import { firebase, admin } from "../../firebase/fbConfig.js";
import User from "../user/userModel.js"
import validator from 'validator';
import jwtDecode from 'jwt-decode';
import Users from "../user/userModel.js";

const users = new Users;

export default class ValidateData {
    async validUpdateData(req, res, next) {
        const errors = {}
        const user = jwtDecode(req.headers.token);
        let hasError = false
        //validate email
        errors.email = []
        if (req.body.email) {
            console.log("email:", req.body.email)
            if (!validator.isEmail(req.body.email)) {
                errors.email.push("Wrong email")
                hasError = true
            }
            const isExistEmail = await users.get({ email: req.body.email })
            if (isExistEmail) {
                if (isExistEmail.uid != user.user_id) {
                    errors.email.push("Email was used by another user")
                    hasError = true
                }
            }
        }
        //validate phone
        errors.phone = []
        if (req.body.phone) {
            if (!validator.isMobilePhone(req.body.phone)) {
                errors.phone.push("Wrong phone number")
                hasError = true
            }
            const isExistPhone = await users.get({ phone: req.body.phone })
            if (isExistPhone) {
                if (isExistPhone.uid != user.user_id) {
                    errors.email.push("Email was used by another user")
                    hasError = true
                }
            }
        }
        //validate address
        errors.address = []
        if (req.body.address) {
            if (req.body.address.length >= 500) {
                errors.address.push("Address must shorter then 500 character ")
                hasError = true
            }
        }
        //validate about
        errors.description = []
        if (req.body.description) {
            if (req.body.description.length >= 500) {
                errors.description.push("Description must shorter then 500 character ")
                hasError = true
            }
        }
        if (hasError) {
            return res.json({
                result: "not OK",
                errors: errors,
            })
        }
        return next()
    }
}