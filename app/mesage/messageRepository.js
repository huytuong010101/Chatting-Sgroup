import Message from "../../mongoDB/models/message.js"

export default class HandleMessage {
    //add new sms to DB
    newMessage(context) {
        if (context.mode == 0) {
            const AsendB = new Message({
                userA: context.senderId,
                userB: context.receiverId,
                mode: context.mode,
                relationship: 0, // A send B
                body: context.content,
                sent_at: new Date(),
                is_seen: false,
            }).save()
            const AreceiveFromB = new Message({
                userB: context.senderId,
                userA: context.receiverId,
                mode: context.mode,
                relationship: 1, // A receive from B
                body: context.content,
                sent_at: new Date(),
                is_seen: false,
            }).save()
            console.log("save ok")
        }
    }
    //load sms of friend
    getMessageOfUser(receiver, sender) {
        return Message.find({ userA: receiver, userB: sender, mode: 0 }).exec()
    }
    //get sms history
    async getSmsHistory(id) {
        const listSms = await Message.aggregate([
            {
                "$match": {
                    "userA": id,
                }
            },
            {
                "$group": {
                    "_id": "$userB",
                    "userB": { "$last": "$userB" },
                    "body": { "$last": "$body" },
                    "sent_at": { "$last": "$sent_at" },
                    "relationship": { "$last": "$relationship" },
                }
            }
        ]).exec()
        return listSms;
    }
}