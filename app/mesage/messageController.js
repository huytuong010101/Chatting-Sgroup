import Message from "./messageRepository.js"
import jwtDecode from 'jwt-decode';

const message = new Message

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
}