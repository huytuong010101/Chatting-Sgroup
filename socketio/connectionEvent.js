const connectionEvent = (socket) => {
    console.log('new user with id:', socket.id);
    //receiver msg
    socket.on("clientSendNewMsg", (msg) => {
        console.log(msg)
        console.log(socket.id)
        socket.broadcast.emit("serverSendMsg", msg);
    })
    socket.on("registerUser", (msg) => {

    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
}
export default connectionEvent