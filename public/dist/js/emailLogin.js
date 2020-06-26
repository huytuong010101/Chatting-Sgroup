$(document).ready(() => {
    $("#btnEmailLogin").click(async (e) => {
        e.preventDefault();
        const email = $("#email").val();
        const password = $("#password").val();
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (e) {
            swal("Login failed!", "Please check info again", "error");
            return;
        }
        swal("OK!", "Gooood", "success");
        //save data to localStorage
        const token = await firebase.auth().currentUser.getIdToken(true);
        localStorage.setItem("authToken", token);
        window.location.href = "/";
    });
})