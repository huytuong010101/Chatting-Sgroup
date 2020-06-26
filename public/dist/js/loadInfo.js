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
    const data = {
        fullname: $("#fullname").val(),
        phone: $("#phone").val(),
        email: $("#myEmail").val(),
        description: $("#about-text").val(),
        address: $("#address").val(),
    }
    $.ajax({
        type: "PUT",
        url: "/user/update-info",
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
