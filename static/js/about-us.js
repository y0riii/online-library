const username = document.querySelector(".username")
const logout = document.querySelector(".logout")
const myBooks = document.querySelector(".my-books")
const addBook = document.querySelector(".add-book")
let isAdmin = localStorage.getItem("role")
if(isAdmin == "on") isAdmin = true;
else isAdmin = false;

if (!localStorage.getItem("loggedIn-email")) {
    location.href = "./login.html";
}

logout.addEventListener("click", () => {
    localStorage.removeItem("loggedIn-email")
    localStorage.removeItem("loggedIn-username")
    localStorage.removeItem("role")
    window.location.href = "./login.html"
})

document.addEventListener("DOMContentLoaded", () => {
    let name = localStorage.getItem("loggedIn-username")
    if(isAdmin) myBooks.style.display = "none";
    else addBook.style.display = "none"
    if(!name) name = "Guest"
    username.innerHTML = `Hello, ${name}`
})