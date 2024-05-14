const username = document.querySelector(".username")
const logout = document.querySelector(".logout")
const myBooks = document.querySelector(".my-books")
const addBook = document.querySelector(".add-book")
const booksCont = document.querySelector(".books-cont")
const searchInput = document.querySelector(".search-input")
const searchCategory = document.querySelector(".search-category")
const searchAva = document.querySelector(".ava")
const searchBtn = document.querySelector(".search-btn")
let bs;
let books = []
let isAdmin = localStorage.getItem("role")
if(isAdmin == "on") isAdmin = true;
else isAdmin = false;

if (!localStorage.getItem("loggedIn-email")) {
    location.href = "./login.html";
}

function searchBooks() {
    let title = searchInput.value;
    let category = searchCategory.value;
    let ava = searchAva.checked;
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
                    else {
                        if(book.ownedBy == localStorage.getItem("loggedIn-email")) s = "Owned"
                        else s = "Unavailable";
                    }
                    let div = document.createElement("div")
                    div.classList.add("book")
                    div.setAttribute("key", i)
                    let t = book.title;
                    if(t.length > 14) {
                        t = t.substring(0, 12) + "..";
                    }
                    let a = book.author;
                    if(a.length > 14) {
                        a = a.substring(0, 12) + ".."
                    }
                    div.innerHTML = `<img class="cover" src="${book.cover}">
                    <p class="title">${t}</p>
                    <div class="text-cont-book">
                        <p class="author">${a}</p>
                        <p class="${s}">${s}</p>
                    </div>
                    <p class="obj" style="display:none;">${JSON.stringify(book)}</p>
                    `
                    booksCont.appendChild(div)
                }
            }
        }
    }
    bs = document.querySelectorAll(".book")
    bs.forEach(b => {
        b.addEventListener("click", e => {
            let cur = e.target
            while(!cur.classList.contains("book")) cur = cur.parentElement;
            localStorage.setItem("chosenBook", cur.children[3].innerHTML)
            if(isAdmin) {
                window.location.href = "./book-details-admin.html"
            } else {
                window.location.href = "./book-details-user.html"
            }
        })
    })
}

function showBooks() {
    for(let i=0; i<books.length; ++i) {
        let book = books[i]
        let s;
        if(book.available) s = "Available"
        else {
            if(book.ownedBy == localStorage.getItem("loggedIn-email")) s = "Owned"
            else s = "Unavailable";
        }
        let div = document.createElement("div")
        div.classList.add("book")
        div.setAttribute("key", i)
        let t = book.title;
        if(t.length > 14) {
            t = t.substring(0, 12) + "..";
        }
        let a = book.author;
        if(a.length > 14) {
            a = a.substring(0, 12) + ".."
        }
        div.innerHTML = `<img class="cover" src="${book.cover}">
        <p class="title">${t}</p>
        <div class="text-cont-book">
            <p class="author">${a}</p>
            <p class="${s}">${s}</p>
        </div>
        <p class="obj" style="display:none;">${JSON.stringify(book)}</p>
        `
        booksCont.appendChild(div)
    }
    bs = document.querySelectorAll(".book")
    bs.forEach(b => {
        b.addEventListener("click", e => {
            let cur = e.target
            while(!cur.classList.contains("book")) cur = cur.parentElement;
            localStorage.setItem("chosenBook", cur.children[3].innerHTML)
            if(isAdmin) {
                window.location.href = "./book-details-admin.html"
            } else {
                window.location.href = "./book-details-user.html"
            }
        })
    })
}

searchBtn.addEventListener("click", searchBooks)

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
    username.innerHTML = `Hello, ${name}`
    let booksCount = parseInt(localStorage.getItem("book-count"))
    for(let i=1; i<booksCount + 1; ++i) {
        let cur = localStorage.getItem("book" + i.toString())
        if(cur) {
            let b = JSON.parse(cur);
            books.push(b);
        }
    }
    showBooks()
})