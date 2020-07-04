const socket = io("http://localhost:8000");
socket.on("connect", () => {
    console.log("socket connected to server")
    socket.emit("registerUser", { "token": "123" })
})
socket.on("serverSendMsg", (msg) => {
    const type = ""
    console.log(msg)
    ChatosExamle.Message.add(msg, '');
})
$("#messageFrom").submit((e) => {
    e.preventDefault();
    let msg = $("#messageContent").val()
    msg = $.trim(msg);
    $("#messageContent").val("")
    socket.emit("clientSendNewMsg", msg);
    ChatosExamle.Message.add(msg, 'outgoing-message');
    return false;
})