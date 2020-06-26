const token = localStorage.getItem('authToken');
if (token) window.location.href = "/";
/*
$.ajax({
    url: "/auth/verify-token",
    type: "POST",
    data: { token: token },
    success: (res) => {
        if (res.result == "OK") window.location.href = "/";
    }
})
*/