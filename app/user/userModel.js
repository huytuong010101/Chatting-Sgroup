import knex from "../../database/pgConfig.js";

export default class Friends {
    async all() {
        return await knex("users").select("uid", "fullname", "avatar", "email", "phone", "description", "address", "birthday")
    }
    async filter(condition) {
        return await knex("users").select("uid", "fullname", "avatar", "email", "phone", "description", "address", "birthday").where(condition)
    }
    async get(condition) {
        return await knex("users").select("uid", "fullname", "avatar", "email", "phone", "description", "address", "birthday").where(condition).first()
    }
    async update(condition, content) {
        await knex("users").where(condition).update(content)
    }
    async delete(condition) {
        await knex("users").where(condition).del()
    }
    async insert(content) {
        await knex("users").insert(content)
    }
}