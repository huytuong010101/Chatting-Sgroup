import { admin } from "../firebase/fbConfig.js";
import jwtDecode from 'jwt-decode';

const connectionEvent = (socket) => {
    console.log('new user with id:', socket.id);
    //receiver msg
    socket.on("clientSendNewMsg", (request) => {
        console.log(socket.userName, " sent to  ", request.receiver, ": ", request.msg, "-mode:", request.mode)
        socket.to(request.receiver).emit("serverSendMsg", {
            senderId: socket.userId,
            senderName: socket.userName,
            mode: request.mode,
            msg: request.msg,
        });
    })
    //validate connection
    socket.on("registerUser", async (msg) => {
        try {
            await admin.auth().verifyIdToken(msg.token);
            const user = jwtDecode(msg.token);
            socket.userId = user.user_id;
            socket.userName = user.name;
            socket.join(user.user_id);
        } catch (e) {
            console.log("Can't register user with socket because of wrong token");
            socket.disconnect();
        }
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.leave(socket.userId)
    });
}
export default connectionEvent