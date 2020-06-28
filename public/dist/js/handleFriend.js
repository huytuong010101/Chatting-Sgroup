//load all friend request
const loadAllRequest = () => {
    $("#list-request").html("");
    $.ajax({
        type: "GET",
        url: "/friend/get-friend-requests",
        headers: {
            token: localStorage.getItem("authToken"),
        },
        success: (response) => {
            response.forEach(item => {
                let str = `<ul class="list-group list-group-flush users-list"><li class="list-group-item"><div class="users-list-body"><h5><figure class="avatar"><img class="rounded-circle" src="${item.avatar}"></figure>  ${item.fullname}</h5><p>${item.message}</p><div class="users-list-action action-toggle"><div class="dropdown"><a data-toggle="dropdown" href="#"><i class="ti-more"></i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="/user/${item.userB}">View profile</a><a class="dropdown-item" onclick="acceptRequest(event)" data-id=${item.userB}>Accept</a><a class="dropdown-item" onclick="deleteRequest(event)" data-id=${item.userB}>Delete</a></div></div></div></div></li></ul>`
                $("#list-request").append(str)
            });
            if (response.length == 0) $("#list-request").append("<h6 class='text-warning text-center'>You have no friend request</h6>")
        }

    })
}
loadAllRequest();
//load all friend
const loadAllFriend = () => {
    $.ajax({
        type: "GET",
        url: "/friend/get-friend-list",
        headers: {
            token: localStorage.getItem("authToken"),
        },
        success: (response) => {
            $("#list-friend").html("");
            response.forEach(item => {
                let str = `<li class="list-group-item"><div><figure class="avatar"><img class="rounded-circle" src="${item.avatar}"></figure></div><div class="users-list-body"><h5>${item.fullname}</h5><p>Lorem ipsum dolor sitsdc sdcsdc sdcsdcs</p><div class="users-list-action action-toggle"><div class="dropdown"><a data-toggle="dropdown" href="#" aria-expanded="false"><i class="ti-more"></i></a><div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position: absolute; transform: translate3d(-142px, 22px, 0px); top: 0px; left: 0px; will-change: transform;"><a class="dropdown-item" href="#">Open</a><a class="dropdown-item" href="/user/${item.userB}" data-navigation-target="contact-information">Profile</a><a class="dropdown-item" href="#">Add to archive</a><a class="dropdown-item" href="#">Delete</a></div></div></div></div></li>`
                $("#list-friend").append(str)
            });
            if (response.length == 0) $("#list-friend").append("<h6 class='text-warning text-center'>You have no friend</h6>")
        }

    })
}
loadAllFriend();
$("#sendFriendRequest").click(() => {
    let email = $("#email").val()
    let message = $("#message").val()
    $.ajax({
        type: "POST",
        url: "/friend/send-request",
        headers: {
            token: localStorage.getItem("authToken"),
        },
        data: {
            email: email,
            message: message,
        },
        success: (response) => {
            if (response.result == "OK") {
                swal("Thành công", "Bạn đã gửi lời mời thành công", "success");
            } else {
                swal("Lỗi", response.error, "error");
            }
        }
    })
})

const acceptRequest = (event) => {
    $.ajax({
        type: "PUT",
        url: "/friend/accept",
        headers: {
            token: localStorage.getItem("authToken"),
        },
        data: {
            id: event.target.dataset.id,
        },
        success: (response) => {
            if (response.result == "OK") {
                swal("Thành công", "Bây giờ 2 người đã có thể tán nhau", "success");
                loadAllRequest();
                loadAllFriend();
            } else {
                swal("Lỗi", "Lỗi rồi ông eii", "error");
            }
        }
    })

}

const deleteRequest = (event) => {
    $.ajax({
        type: "DELETE",
        url: "/friend/delete-request",
        headers: {
            token: localStorage.getItem("authToken"),
        },
        data: {
            id: event.target.dataset.id,
        },
        success: (response) => {
            if (response.result == "OK") {
                swal("Thành công", "Đã xóa yêu cầu kết bạn nè. Bạn thật chảnh", "success");
                loadAllRequest();
                loadAllFriend();
            } else {
                swal("Lỗi", "Lỗi rồi ông eii", "error");
            }
        }
    })

}


