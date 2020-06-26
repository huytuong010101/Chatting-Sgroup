const { knex } = require("../../database/pgConfig");
const { firebase, admin } = require("../../firebase/fbConfig");
const jwtDecode = require('jwt-decode');

const getMyInfo = async (req, res) => {
    const user = jwtDecode(req.headers.token);
    myUser = await knex("users").select("fullname", "avatar", "email", "phone", "description", "address").where({ uid: user.user_id }).first()
    console.log("my user:")
    console.log(myUser)
    return res.json(myUser)
}

const updateMyInfo = async (req, res) => {
    const user = jwtDecode(req.headers.token);
    await knex("users").where("uid", "=", user.user_id)
        .update({
            fullname: req.body.fullname,
            phone: req.body.phone,
            email: req.body.email,
            description: req.body.description,
            address: req.body.address,
        })
    return res.json({
        result: "OK",
    })
}

module.exports = {
    getMyInfo,
    updateMyInfo,
}