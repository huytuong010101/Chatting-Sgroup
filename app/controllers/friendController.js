const { knex } = require("../../database/pgConfig");
const { firebase, admin } = require("../../firebase/fbConfig");
const jwtDecode = require('jwt-decode');

const sendRequest = async (req, res) => {
    const info = await knex("users").where("email", "=", req.body.email).first()
    const token = req.headers.token;
    const user = jwtDecode(token);
    if (!info || info.email == user.email) {
        return res.json({
            result: "not OK",
            error: "Email không khớp",
        })
    }
    const isExist = await knex("friends").where("userA", "=", user.user_id).andWhere("userB", "=", info.uid).first()
    if (!isExist) {
        await knex("friends").insert([
            { userA: user.user_id, userB: info.uid, relationship: 0, message: req.body.message, },
            { userA: info.uid, userB: user.user_id, relationship: 1, message: req.body.message, },
        ])
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

const getFriendRequests = async (req, res) => {
    const user = jwtDecode(req.headers.token);
    let requestList = await knex("friends")
        .select("fullname", "userB", "message", "avatar")
        .where("userA", "=", user.user_id)
        .andWhere("relationship", "=", 1)
        .leftJoin('users', 'friends.userB', 'users.uid')
    console.log(requestList)
    return res.json(requestList)
}

const getAllFriends = async (req, res) => {
    const user = jwtDecode(req.headers.token);
    let friendList = await knex("friends")
        .select("fullname", "userB", "avatar")
        .where("userA", "=", user.user_id)
        .andWhere("relationship", "=", 2)
        .leftJoin('users', 'friends.userB', 'users.uid')
    console.log(friendList)
    return res.json(friendList)
}

const acceptRequest = async (req, res) => {
    const id = req.body.id
    const user = jwtDecode(req.headers.token);
    console.log(id)
    console.log(user.user_id)
    try {
        await knex("friends")
            .where({ userA: user.user_id, userB: id, relationship: 1 })
            .orWhere({ userB: user.user_id, userA: id, relationship: 0 })
            .update({
                relationship: 2,
            })
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

const deleteRequest = async (req, res) => {
    const id = req.body.id
    const user = jwtDecode(req.headers.token);
    console.log(id)
    console.log(user.user_id)
    try {
        await knex("friends")
            .where({ userA: user.user_id, userB: id, relationship: 1 })
            .orWhere({ userB: user.user_id, userA: id, relationship: 0 })
            .del()
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
module.exports = {
    sendRequest,
    getFriendRequests,
    acceptRequest,
    getAllFriends,
    deleteRequest,
}