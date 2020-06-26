const logout = async () => {
    await firebase.auth().signOut()
    await localStorage.removeItem("authToken")
    window.location.href = "/auth/login-email"
}
logout();