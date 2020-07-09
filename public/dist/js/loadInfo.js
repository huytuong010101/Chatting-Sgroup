const loadMyProfile = () => {
    $("#newAvatar").val("");
    $(".error").html("");
    $.ajax({
        type: "GET",
        url: "/user/get-info",
        headers: {
            token: localStorage.getItem("authToken"),
        },
        success: async (response) => {
            if (response.result == "not OK") {
                await swal("Opps", "Your session is expire. You must login again", "warning")
                localStorage.setItem("authToken", "")
                window.location.href = "/auth/login-email"
            }
            $("#fullname").val(response.fullname)
            $("#avatar").attr("src", response.avatar)
            $("#phone").val(response.phone ? response.phone : "")
            $("#myEmail").val(response.email ? response.email : "")
            $("#about-text").val(response.description)
            $("#address").val(response.address)
        }

    })
}
loadMyProfile()
const updateInfo = (event) => {
    //show loading img
    $("#loading-img").css("display", "block")
    //
    const data = new FormData();
    data.append("fullname", $("#fullname").val())
    data.append("phone", $("#phone").val())
    data.append("description", $("#about-text").val())
    data.append("address", $("#address").val())
    data.append("email", $("#myEmail").val())
    const avatar = $('#newAvatar')[0].files[0];
    if (avatar) data.append("avatar", avatar)
    $.ajax({
        type: "POST",
        url: "/user/update-info",
        contentType: false,
        processData: false,
        headers: {
            token: localStorage.getItem("authToken"),
        },
        data: data,
        success: (response) => {
            $("#loading-img").css("display", "none")
            if (response.result == "OK") {
                swal("Success", "You infomation was updated", "success");
                loadMyProfile();
            } else {
                $(".error").html("")
                swal("Error", "Somethings were wrong", "error")
                if (response.errors) {
                    response.errors.email.forEach(item => {
                        $("#emailError").append(item)
                        $("#emailError").append("<br>")
                    });
                    response.errors.phone.forEach(item => {
                        $("#phoneError").append(item)
                        $("#phoneError").append("<br>")
                    });
                    response.errors.address.forEach(item => {
                        $("#addressError").append(item)
                        $("#addressError").append("<br>")
                    });
                    response.errors.description.forEach(item => {
                        $("#descriptionError").append(item)
                        $("#descriptionError").append("<br>")
                    });
                }
            }
        }
    })
}
$(document).ready(() => {
    const checkEmailVerify = async () => {
        const user = JSON.parse(atob(localStorage.getItem("authToken").split('.')[1]))
        if (!user.email_verified && user.email) {
            const doesSendEmail = await swal({
                title: "Bạn chưa xác thực email",
                text: "Bạn có muốn xác thực email ngay bây giờ?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            if (doesSendEmail) {
                const currentUser = await firebase.auth().currentUser
                try {
                    await currentUser.sendEmailVerification()
                    await swal("Success", `Please check your email (${user.email}) and login again`, "success")
                    window.location.href = "/auth/logout"

                } catch {
                    swal("Error", "Somgthing were wrong", "error")
                }
            }
        }
    }
    checkEmailVerify()
    //preview avatar
    $("#newAvatar").change((event) => {
        $("#avatar").attr("src", URL.createObjectURL(event.target.files[0]))
        document.getElementById("avatar").onload = () => {
            URL.revokeObjectURL(document.getElementById("avatar").src) // free memory
        }
    })
    //load sms history
    const loadOldSms = () => {
        $.ajax({
            type: "GET",
            url: "/sms/get-message-history",
            headers: {
                token: localStorage.getItem("authToken"),
            },
            success: (response) => {
                if (response.result == "OK") {
                    console.log("history", response)
                    response.message.forEach(async item => {
                        $("#chatHistory").append(`<li data-id="${item.info.uid}" onclick="startChattingWith(event)" class="list-group-item"><div><figure class="avatar"><img class="rounded-circle" src="${item.info.avatar}"></figure></div><div class="users-list-body"><h5>${item.info.fullname}</h5><p>${item.relationship == 0 ? "Sent: " : "Received: "}${item.message}</p><div class="users-list-action action-toggle"><div class="dropdown"><a data-toggle="dropdown" href="#"><i class="ti-more"></i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item active" data-id="${item.info.uid}" onclick="startChattingWith(event)"  data-navigation-target="contact-information">Profile</a><a class="dropdown-item" href="#">Add to archive</a><a data-id="${item.info.uid}" class="dropdown-item" href="#">Delete</a></div></div></div></div></li>`)
                    })
                }
            }

        })
    }
    loadOldSms()
})