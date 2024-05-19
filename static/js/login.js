var inputs = document.querySelectorAll(".input")
const email = document.querySelector(".email")
const password = document.querySelector(".password")
const form = document.querySelector("form")
const username = document.querySelector(".username")
const logout = document.querySelector(".logout")
let isAdmin = localStorage.getItem("role")
if(isAdmin == "on") isAdmin = true;
else isAdmin = false;
inputs.forEach(input => {
    input.addEventListener("focus", () => {
        input.parentElement.classList.add("focus")
    })
    input.addEventListener("blur", () => {
        if (input.value == "") input.parentElement.classList.remove("focus")
    })
})

// form.addEventListener("submit", (e) => {
//     e.preventDefault()
//     let user = {
//         email: email.value,
//         password: password.value,
//     }
//     let name = localStorage.getItem(JSON.stringify(user))
//     if(name) {
//         localStorage.setItem("loggedIn-email", user.email)
//         localStorage.setItem("loggedIn-username", name)
//         localStorage.setItem("role", localStorage.getItem(user.email + "is-admin"))
//         window.location.href = "./home.html"
//     } else {
//         alert("User does not exist.")
//     }
// })

// document.addEventListener("DOMContentLoaded", () => {
//     if(isAdmin) myBooks.style.display = "none";
//     else addBook.style.display = "none"
// })