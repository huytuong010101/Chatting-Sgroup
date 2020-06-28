const loadMyProfile = () => {
    $.ajax({
        type: "GET",
        url: "/user/get-info",
        headers: {
            token: localStorage.getItem("authToken"),
        },
        success: (response) => {
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
    const data = new FormData();
    data.append("fullname", $("#fullname").val())
    data.append("phone", $("#phone").val())
    data.append("description", $("#about-text").val())
    data.append("address", $("#address").val())
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
            if (response.result == "OK") {
                swal("Success", "You infomation was updated", "success");
                loadMyProfile();
            } else swal("Error", "Somethings were wrong", "error")
        }
    })
}
