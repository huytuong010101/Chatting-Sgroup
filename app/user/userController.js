import { firebase, admin } from "../../firebase/fbConfig.js";
import jwtDecode from 'jwt-decode';
import path from "path"
import fs from "fs"
import User from "./userRepository.js"
import upload from "../../config/uploadConfig.js"
//upload file
const __dirname = path.resolve();
const users = new User;

export default class UserController {
    //function use to get info of current user
    async getMyInfo(req, res) {
        const user = jwtDecode(req.headers.token);
        const myUser = await users.get({ uid: user.user_id })
        return res.json(myUser)
    }
    //function use to update current user
    async updateMyInfo(req, res) {
        const user = jwtDecode(req.headers.token);
        const updateData = {
            fullname: req.body.fullname,
            phone: req.body.phone,
            description: req.body.description,
            address: req.body.address,
            email: req.body.email,
        }
        const firebaseData = {
            email: req.body.email ? req.body.email : null,
            phoneNumber: req.body.phone ? req.body.phone : null,
            displayName: req.body.fullname,
        }
        if (req.body.email != user.email) {
            firebaseData.emailVerified = false
            updateData.email_verified = false
        }
        if (req.file) {
            const pathFile = __dirname + "/public/avatar/" + req.file.filename
            await upload.uploader.upload(pathFile, function (error, result) {
                if (result) {
                    updateData.avatar = result.url
                    firebaseData.photoURL = result.url
                }
                fs.unlinkSync(pathFile)
            });
        }
        try {
            await admin.auth().updateUser(user.user_id, firebaseData)
            await users.update({ "uid": user.user_id }, updateData)
            return res.json({
                result: "OK",
            })
        } catch (err) {
            console.log(err.message)
            return res.json({
                result: "not OK",
                error: "Bug when insert to DB",
            })
        }

    }
}

