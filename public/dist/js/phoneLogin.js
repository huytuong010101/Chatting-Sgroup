$(document).ready(async () => {
    firebase.auth().languageCode = 'it';
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    $("#btnSubmit").on("click", async (e) => {
        const phoneNumber = $("#phoneNumber").val();
        $("#recaptcha-container").css("display", "block");
        const appVerifier = window.recaptchaVerifier;
        window.confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
        $("#recaptcha-container").css("display", "none");
        $("#login-phone-step2").css("display", "block");
    })
    $("#btnLogin").on("click", async (e) => {
        const code = $("#code").val();
        try {
            await window.confirmationResult.confirm(code)
        } catch (e) {
            swal("Login failed!", "Please check info again", "error");
        }
        const token = await firebase.auth().currentUser.getIdToken(true);
        localStorage.setItem("authToken", token);
        await $.ajax({
            type: "POST",
            url: "/auth/add-phone-account",
            headers: {
                token: token,
            },
            success: (response) => {
            }
        })
        window.location.href = "/";
    })
})
