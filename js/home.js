const username = document.querySelector(".username")
const logout = document.querySelector(".logout")
const myBooks = document.querySelector(".my-books")
const addBook = document.querySelector(".add-book")
const booksCont = document.querySelector(".books-cont")
const searchInput = document.querySelector(".search-input")
const searchCategory = document.querySelector(".search-category")
const searchAva = document.querySelector(".ava")
const searchBtn = document.querySelector(".search-btn")
let books = [
    {
        id: 1,
        cover: "./images/can't hurt me.png",
        title: "Can't Hurt Me",
        author: "David Goggins",
        category: "self-improvement",
        available: true,
    },
    {
        id: 2,
        cover: "./images/deep-work.jpg",
        title: "Deep Work",
        author: "Cal Newport",
        category: "romance",
        available: true,
    },
]

function searchBooks() {
    let title = searchInput.value;
    let category = searchCategory.value;
    let ava = searchAva.value;
    if(ava == "on") ava = true;
    else ava = false;
    booksCont.innerHTML = ""
    for(let i=0; i<books.length; ++i) {
        let book = books[i]
        if(book.category == category || category == "all") {
            if(ava == false || (book.available == true && ava == true)) {
                let regex = new RegExp(title, 'i')
                title = title.trim();
                if(regex.test(book.title) || regex.test(book.author)) {
                    let s;
                    if(book.available) s = "Available"
                    else s = "Owned"
                    let div = document.createElement("a")
                    div.href = "/book/" + book.id
                    div.classList.add("book")
                    div.setAttribute("key", i)
                    div.innerHTML = `<img class="cover" src="${book.cover}">
                    <p class="title">${book.title}</p>
                    <div class="text-cont-book">
                        <p class="author">${book.author}</p>
                        <p class="${s}">${s}</p>
                    </div>
                    `
                    booksCont.appendChild(div)
                }
            }
        }
    }
}

function showBooks() {
    for(let i=0; i<books.length; ++i) {
        let book = books[i]
        let s;
        if(book.available) s = "Available"
        else s = "Owned"
        let div = document.createElement("a")
        div.href = "/book/" + book.id
        div.classList.add("book")
        div.setAttribute("key", i)
        div.innerHTML = `<img class="cover" src="${book.cover}">
        <p class="title">${book.title}</p>
        <div class="text-cont-book">
            <p class="author">${book.author}</p>
            <p class="${s}">${s}</p>
        </div>
        `
        booksCont.appendChild(div)
    }
}

searchBtn.addEventListener("click", searchBooks)

logout.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "http://127.0.0.1:5500/team-college-project/login.html"
})

document.addEventListener("DOMContentLoaded", () => {
    let name = localStorage.getItem("loggedIn-username")
    let isAdmin = localStorage.getItem("loggedIn-role")
    if(isAdmin = "on") isAdmin = true;
    else isAdmin = false;
    if(isAdmin) myBooks.style.display = "none";
    else addBook.style.display = "none"
    username.innerHTML = `Hello, ${name}`
    showBooks()
})