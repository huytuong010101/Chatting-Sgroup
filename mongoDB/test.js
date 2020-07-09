import Message from "../app/mesage/messageRepository.js"

const msg = new Message()
const func = async () => {
    console.log(await msg.getSmsHistory("mUMZjHCjd3MlARF7aXbFK1qWtyY2"))
}
func()



