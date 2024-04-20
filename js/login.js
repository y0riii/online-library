var inputs = document.querySelectorAll(".input")
const email = document.querySelector(".email")
const password = document.querySelector(".password")
const form = document.querySelector("form")
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
    let name = sessionStorage.getItem(JSON.stringify(user))
    if(name) {
        localStorage.setItem("loggedIn-email", user.email)
        localStorage.setItem("loggedIn-username", name)
        localStorage.setItem("role", sessionStorage.getItem(user.email + "is-admin"))
        window.location.href = "http://127.0.0.1:5500/team-college-project/home.html"
    } else {
        alert("User does not exist.")
    }
})