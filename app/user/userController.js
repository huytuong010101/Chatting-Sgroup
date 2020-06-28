import knex from "../../database/pgConfig.js";
import { firebase, admin } from "../../firebase/fbConfig.js";
import jwtDecode from 'jwt-decode';
import User from "./userModel.js"

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
        await users.update({ "uid": user.user_id }, {
            fullname: req.body.fullname,
            phone: req.body.phone,
            description: req.body.description,
            address: req.body.address,
        })
        return res.json({
            result: "OK",
        })
    }
}

