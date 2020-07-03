import knex from "../../database/pgConfig.js";

export default class Friend {
    async allFriendsOf(id) {
        return await knex("friends")
            .select("fullname", "userB", "avatar", "uid", "description", "phone", "email")
            .where("userA", "=", id)
            .andWhere("relationship", "=", 2)
            .leftJoin('users', 'friends.userB', 'users.uid')
    }
    async addFriendRequest(sender, receiver, msg) {
        await knex("friends").insert([
            { userA: sender, userB: receiver, relationship: 0, message: msg, },
            { userA: receiver, userB: sender, relationship: 1, message: msg, },
        ])
    }
    async get(condition) {
        return await knex("friends").select("*").where(condition).first();
    }
    async allRequestOf(id) {
        return await knex("friends")
            .select("fullname", "userB", "message", "avatar", "uid", "description")
            .where("userA", "=", id)
            .andWhere("relationship", "=", 1)
            .leftJoin('users', 'friends.userB', 'users.uid')
    }
    async changeToAccept(sender, receiver) {
        await knex("friends")
            .where({ userA: sender, userB: receiver, relationship: 1 })
            .orWhere({ userB: sender, userA: receiver, relationship: 0 })
            .update({
                relationship: 2,
            })
    }
    async deleteRequest(sender, receiver) {
        await knex("friends")
            .where({ userA: sender, userB: receiver, relationship: 1 })
            .orWhere({ userB: sender, userA: receiver, relationship: 0 })
            .del()
    }
    async unfriend(sender, receiver) {
        await knex("friends").where({ userA: sender, userB: receiver, relationship: 2 })
            .orWhere({ userB: sender, userA: receiver, relationship: 2 })
            .del()
    }
    async getInfoIfFriend(whoGet, getWho) {
        return await knex("friends")
            .select("fullname", "userB", "avatar", "uid", "description", "phone", "email", "address")
            .where({ userA: whoGet, userB: getWho, relationship: 2 })
            .leftJoin('users', 'friends.userB', 'users.uid')
            .first()
    }
}