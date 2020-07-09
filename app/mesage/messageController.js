import Message from "./messageRepository.js"
import User from "../user/userRepository.js"
import jwtDecode from 'jwt-decode';

const message = new Message
const users = new User
const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
const startGetInfo = async (idAndSms, data) => {
    await asyncForEach(idAndSms, async (item, index, array) => {
        const currentUser = await users.get({ uid: item.userB })
        data.push({
            info: currentUser,
            message: item.body,
            relationship: item.relationship,
        })
    });
}

export default class MessageController {
    async getMessage(req, res) {
        const mode = Number(req.query.mode)
        const user = jwtDecode(req.headers.token);
        if (mode == 0) {
            const sms = await message.getMessageOfUser(user.user_id, req.query.id)
            return res.json({
                result: "OK",
                message: sms,
            })
        }
    }
    async getMessageHistory(req, res) {
        const user = jwtDecode(req.headers.token);
        const idAnsSms = await message.getSmsHistory(user.user_id)
        const data = []
        await startGetInfo(idAnsSms, data)
        return res.json({
            result: "OK",
            message: data,
        })
    }
}