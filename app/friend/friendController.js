import knex from "../../database/pgConfig.js";
import { firebase, admin } from "../../firebase/fbConfig.js";
import jwtDecode from 'jwt-decode';
import Friend from "./friendModel.js"
import User from "../user/userModel.js"

const friends = new Friend;
const users = new User;

export default class FriendController {
    //send new request
    async sendRequest(req, res) {
        const info = await users.get({ "email": req.body.email })
        const token = req.headers.token;
        const user = jwtDecode(token);
        if (!info || info.email == user.email) {
            return res.json({
                result: "not OK",
                error: "Email không khớp",
            })
        }
        const isExist = await friends.get({ "userA": user.user_id, "userB": info.uid })
        if (!isExist) {
            await friends.addFriendRequest(user.user_id, info.uid, req.body.message)
            return res.json({
                result: "OK",
                message: "Đã add vào",
            })
        }
        let error = "";
        switch (isExist.relationship) {
            case 0:
                error = "Bạn đã gửi lời mời kết bạn rồi!";
                break;
            case 1:
                error = "Người này đã gửi lời mời cho bạn!";
                break;
            case 3:
                error = "Hai người đã là bạn bè";
                break;
            default:
                error = "Không thể gửi lời mời kết bạn";
                break;
        }
        return res.json({
            result: "not OK",
            error: error,
        })
    }
    //get all friend requests
    async getFriendRequests(req, res) {
        const user = jwtDecode(req.headers.token);
        let requestList = await friends.allRequestOf(user.user_id)
        console.log("all friend request")
        console.log(requestList)
        return res.json(requestList)
    }
    //get all friends
    async getAllFriends(req, res) {
        const user = jwtDecode(req.headers.token);
        let friendList = await friends.allFriendsOf(user.user_id)
        console.log(friendList)
        return res.json(friendList)
    }
    //accept friend request
    async acceptRequest(req, res) {
        const id = req.body.id
        const user = jwtDecode(req.headers.token);
        console.log(id)
        console.log(user.user_id)
        try {
            await friends.changeToAccept(user.user_id, id);
            return res.json({
                result: "OK",
            })
        } catch {
            return res.json({
                result: "not OK",
                error: "Something were wrong",
            })
        }



    }
    //delete friend request
    async deleteRequest(req, res) {
        const id = req.body.id
        const user = jwtDecode(req.headers.token);
        console.log(id)
        console.log(user.user_id)
        try {
            await friends.deleteRequest(user.user_id, id)
            return res.json({
                result: "OK",
            })
        } catch {
            return res.json({
                result: "not OK",
                error: "Loi ko xac dinh",
            })
        }

    }

}