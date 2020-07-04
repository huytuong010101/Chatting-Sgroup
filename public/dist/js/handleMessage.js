const socket = io("http://localhost:8000");
//connect and validate
socket.on("connect", () => {
    console.log("socket connected to server")
    socket.emit("registerUser", { "token": localStorage.getItem("authToken") })
})
//reeceive msg from server
socket.on("serverSendMsg", (response) => {
    if ($("#receiverId").val() == response.sender) {
        ChatosExamle.Message.add(response.msg, '');
    } else {
        const htmlSeeMsg = '<br><br><a data-id="' + response.sender + '" onclick="startChattingWith(event)">See more</a>'
        toastr.info(response.msg + htmlSeeMsg, "Tin nhắn mới")
    }

})
//send a msg
$("#messageFrom").submit((e) => {
    e.preventDefault();
    let msg = $("#messageContent").val()
    msg = $.trim(msg);
    $("#messageContent").val("")
    socket.emit("clientSendNewMsg", {
        mode: 0,
        msg: msg,
        receiver: $("#receiverId").val(),
    });
    ChatosExamle.Message.add(msg, 'outgoing-message');
    return false;
})

