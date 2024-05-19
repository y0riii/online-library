var inputs = document.querySelectorAll(".input")
const form = document.querySelector("form")
const usernameInput = document.querySelector(".usernameInput")
const email = document.querySelector(".email")
const admin = document.querySelector("#admin")
const password = document.querySelector(".password")
const rPassword = document.querySelector(".rPassword")
const username = document.querySelector(".username")
const logout = document.querySelector(".logout")
let isAdmin = false;

inputs.forEach(input => {
    input.addEventListener("focus", () => {
        input.parentElement.classList.add("focus")
    })
    input.addEventListener("blur", () => {
        if (input.value == "") input.parentElement.classList.remove("focus")
    })
})

document.addEventListener('DOMContentLoaded', () => {
    usernameInput.value = "";
    email.value = "";
    admin.checked = false;
    password.value = "";
    rPassword.value = "";
})

// form.addEventListener("submit", (e) => {
//     e.preventDefault()
//     let user = {
//         email: email.value,
//         password: password.value,
//     }
//     if(usernameInput.value.length < 4) {
//         alert("Username length must be at least 4 characters.");
//         return;
//     }
//     if(email.value.length < 12) {
//         alert("Email length must be at least 12 characters.");
//         return;
//     }
//     if(password.value.length < 8) {
//         alert("Password length must be at least 8 characters.")
//         return;
//     }
//     if(password.value == rPassword.value) {
//         let found = localStorage.getItem(email.value)
//         if(found == "email") {
//             alert("Email is already registered.")
//             return;
//         }
//         found = localStorage.getItem(usernameInput.value)
//         if(found == "username") {
//             alert("Username is already taken.")
//             return;
//         }
//         let ad;
//         if(admin.checked) ad = "on"
//         else ad = "off"
//         localStorage.setItem(JSON.stringify(user), usernameInput.value)
//         localStorage.setItem(email.value, "email")
//         localStorage.setItem(usernameInput.value, "username")
//         localStorage.setItem(user.email + "is-admin", ad)
//         alert("User has been registered successfully.")
//         window.location.href = "./login.html"
//     } else alert("passwords don't match.")
// })

// document.addEventListener("DOMContentLoaded", () => {
//     if(isAdmin) myBooks.style.display = "none";
//     else addBook.style.display = "none"
// })