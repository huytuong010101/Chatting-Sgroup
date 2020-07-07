import Message from "./respository/messageRepository.js"

const msg = new Message()
const func = async () => {
    console.log(await msg.getMessageOfUser("RjYFPB5hyZVPgIM6cmvffJw0Ft13", "mUMZjHCjd3MlARF7aXbFK1qWtyY2"))
}
func()

