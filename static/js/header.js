const headerTages = document.querySelectorAll(".header-tag")
const myBooks = document.querySelector(".my-books")
const addBook = document.querySelector(".add-book")
const home = document.querySelector(".home")
const aboutUs = document.querySelector(".about-us")

const page = window.location.href.split('/')[3];

headerTages.forEach((child) => {
    child.classList.remove("active");
});

if (page == "") {
    home.classList.add("active");
}
else if (page == "add-book") {
    addBook.classList.add("active");
}
else if (page == "my-books") {
    myBooks.classList.add("active");
}
else if (page == "about-us") {
    aboutUs.classList.add("active");
}