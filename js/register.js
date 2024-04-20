var inputs = document.querySelectorAll(".input")
const form = document.querySelector("form")
const username = document.querySelector(".username")
const email = document.querySelector(".email")
const admin = document.querySelector("#admin")
const password = document.querySelector(".password")
const rPassword = document.querySelector(".rPassword")
inputs.forEach(input => {
    input.addEventListener("focus", () => {
        input.parentElement.classList.add("focus")
    })
    input.addEventListener("blur", () => {
        if (input.value == "") input.parentElement.classList.remove("focus")
    })
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let user = {
        email: email.value,
        password: password.value,
    }
    if(username.value.length < 4) {
        alert("Username length must be at least 4 characters.");
        return;
    }
    if(email.value.length < 12) {
        alert("Email length must be at least 12 characters.");
        return;
    }
    if(password.value.length < 8) {
        alert("Password length must be at least 8 characters.")
        return;
    }
    if(password.value == rPassword.value) {
        let found = sessionStorage.getItem(email.value)
        if(found == "email") {
            alert("Email is already registered.")
            return;
        }
        found = sessionStorage.getItem(username.value)
        if(found == "username") {
            alert("Username is already taken.")
            return;
        }
        sessionStorage.setItem(JSON.stringify(user), username.value)
        sessionStorage.setItem(email.value, "email")
        sessionStorage.setItem(username.value, "username")
        sessionStorage.setItem(email.value + "is-admin", admin.value)
        alert("User has been registered successfully.")
        window.location.reload()
    } else alert("passwords don't match.")
})