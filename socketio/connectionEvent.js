import { admin } from "../firebase/fbConfig.js";
import jwtDecode from 'jwt-decode';

const connectionEvent = (socket) => {
    console.log('new user with id:', socket.id);
    //receiver msg
    socket.on("clientSendNewMsg", (msg) => {
        console.log(socket.id, " sent: ", msg)
        io.to("RjYFPB5hyZVPgIM6cmvffJw0Ft13").emit("serverSendMsg", msg);
    })
    socket.on("registerUser", async (msg) => {
        try {
            await admin.auth().verifyIdToken(msg.token);
            const user = jwtDecode(msg.token);
            socket.id = user.user_id;
        } catch (e) {
            console.log("Can't register user with socket because of wrong token")
        }
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
}
export default connectionEvent