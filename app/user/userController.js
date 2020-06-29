import knex from "../../database/pgConfig.js";
import { firebase, admin } from "../../firebase/fbConfig.js";
import cloudinary from "cloudinary"
import jwtDecode from 'jwt-decode';
import path from "path"
import fs from "fs"
import User from "./userModel.js"
import upload from "../../config/uploadConfig.js"
//upload file
const __dirname = path.resolve();
const users = new User;

export default class UserController {
    //function use to get info of current user
    async getMyInfo(req, res) {
        const user = jwtDecode(req.headers.token);
        const myUser = await users.get({ uid: user.user_id })
        console.log("Current user:")
        console.log(myUser)
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
        }
        if (req.file) {
            const pathFile = __dirname + "/public/avatar/" + req.file.filename
            await upload.uploader.upload(pathFile, function (error, result) {
                if (result) updateData.avatar = result.url
                fs.unlinkSync(pathFile)
            });
        }
        await users.update({ "uid": user.user_id }, updateData)
        return res.json({
            result: "OK",
        })
    }
}

