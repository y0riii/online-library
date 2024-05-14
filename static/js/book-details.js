let title, author, description, category, img, imgUrl;
let arrofvall = ["png", "jpg", "svg", "jpeg", "gif"];

let bookImg = document.querySelector(".book-img");
let bookAvailable = document.querySelector(".book-available__state");
let bookTitle = document.querySelector(".book-details__book-title");
let bookAuthor = document.querySelectorAll(".book-author");
let bookDescription = document.querySelector(".book-details__about");
let genreContainer = document.querySelector(".book-details__genre-container");
let aboutAuthor = document.querySelector(".about-author__about")

const deleteBtn = document.querySelector(".button__delete");
const editBtn = document.querySelector(".button__edit");
const borrowBtn = document.querySelector(".button__borrow");
const returnBtn = document.querySelector(".button__return");
const username = document.querySelector(".username")
const logout = document.querySelector(".logout")
const myBooks = document.querySelector(".my-books")
const addBook = document.querySelector(".add-book")
let isAdmin = localStorage.getItem("role")
if(isAdmin == "on") isAdmin = true;
else isAdmin = false;
const editFormHTML = `<div class="inp">
                    <input class="input" id="name" type="text"  placeholder="Enter book's title"/><br>
                    <input class="input" id="author" type="text"  placeholder="Enter book's author"/><br>
                    <textarea id="des" placeholder="Write the book's description"></textarea><br>
                    <select id="book">
                    <option value="self-improvement">Self-improvement</option>
                    <option value="fiction">Fiction</option>
                    <option value="romance">Romance</option>
                    <option value="scientific">Scientific</option>
                    <option value="comedy">Comedy</option>
                    <option value="drama">Drama</option>
                    </select><br>
                    <button class="add button" onclick="fun()" onsubmit="return validate()">edit Book</button>
                    </div>
                    <div class="photo"><p>Click to add book's cover</p>
                    <input type="file" accept="image/*" name="inpfile">
                    </div>`

let curBook = JSON.parse(localStorage.getItem("chosenBook"));

const fetchData = () => {
    let email = localStorage.getItem("loggedIn-email")
    bookImg.src = curBook.cover;
    bookAuthor.forEach((item) => item.textContent = curBook.author);
    bookAvailable.textContent = curBook.available ? "Available" : "Not Available";
    if(curBook.ownedBy == email) bookAvailable.textContent = "Owned";
    bookTitle.textContent = curBook.title;
    bookDescription.textContent = curBook.description;
    const genre = document.createElement("span");
    genre.classList.add("book-details__genre");
    genre.textContent = curBook.category;
    for (i = 0; i < genreContainer.children.length; i++) {
        if (genreContainer.children[i].classList.contains("book-details__genre")) {
            genreContainer.removeChild(genreContainer.children[i]);
            i--;    
        }
    }
    
    genreContainer.appendChild(genre);
}

window.addEventListener('load', () => {
    fetchData();
});

document.addEventListener

// create message function
const createMessage = (msg, stat) => {
    const messageBox = document.createElement("div");
    const messageContent = document.createElement("p");
    const node = document.createTextNode(msg);
    messageContent.appendChild(node);
    messageBox.appendChild(messageContent);
    messageBox.classList.add("message");
    if (stat == 1)
        messageBox.classList.add("success-message");
    else  
        messageBox.classList.add("failure-message");
    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.style.top = "3rem";
    }, 0); 

    setTimeout(() => {
        messageBox.style.top = "-10rem";
    }, 2000);
    
    setTimeout(() => {
        document.body.removeChild(messageBox);
    }, 2500);
};

// create form function
const createEditForm = () => {
    const editFromContainer = document.createElement("div");
    const editForm = document.createElement("form");
    editForm.classList.add("form");
    editForm.innerHTML = editFormHTML;
    editFromContainer.appendChild(editForm);
    editFromContainer.classList.add("form-container");
    document.body.appendChild(editFromContainer);
    
    setTimeout(() => {
        editFromContainer.style.top = "5rem";
    }, 0);

    title = document.getElementById("name");
    author = document.getElementById("author");
    description = document.getElementById("des");
    category = document.getElementById("book");
    img = document.getElementsByName("inpfile")[0];
    img.addEventListener('change', (e) => {
        let path = img.value
        let lastIndex = path.lastIndexOf("\\");
        let s = path.substring(lastIndex + 1)
        s = "images/" + s;
        imgUrl = s;
    });
    arrofval = ["png", "jpg", "svg", "jpeg", "gif"];
}

// delete function
const deleteBook = () => {
    freeze(deleteBtn);
    if (curBook === null) {
        createMessage("the book was not found", 0);
    }
    else {
        localStorage.removeItem("book" + curBook.id);
        curBook = null;
        
        bookAvailable.textContent = "Not Available";

        // show succeed message
        createMessage("the book was deleted successfully", 1);
    }
};

if (deleteBtn) deleteBtn.addEventListener("click", deleteBook);

// borrow function
const borrowBook = () => {
    let email = localStorage.getItem("loggedIn-email")
    freeze(borrowBtn);
    if (curBook === null) {
        createMessage("the book was not found", 0);
    }
    else if (curBook.available == false) {
        createMessage("the book is not available", 0);
    }
    else {
        bookAvailable.textContent = "Owned";
        localStorage.removeItem("book" + curBook.id);
        curBook.available = false;
        curBook.ownedBy = email
        localStorage.setItem("book" + curBook.id, JSON.stringify(curBook));
        localStorage.setItem("chosenBook", JSON.stringify(curBook))
        let mb = localStorage.getItem(email+"myBooks")
        if(mb) {
            mb = mb.split(",")
            mb.push(curBook.id)
            mb = mb.join()
        } else mb = curBook.id
        localStorage.setItem(email+"myBooks", mb)
        createMessage("the book was borrowed successfully", 1);
    }
};

if (borrowBtn) borrowBtn.addEventListener("click", borrowBook);

// return book function
const returnBook = () => {
    freeze(returnBtn);
    curBook = JSON.parse(localStorage.getItem("chosenBook"));
    let email = localStorage.getItem("loggedIn-email")
    let mb = localStorage.getItem(email+"myBooks");
    if(mb) mb = mb.split(",")
    else mb = []
    if (mb.filter((book, idx) => {
        if (book == curBook.id.toString()) {
            mb.splice(idx, 1);
            return true;
        }
        return false;
    }).length > 0) {
        bookAvailable.textContent = "Available";
        curBook.available = true;
        curBook.ownedBy = null;
        let bk = JSON.parse(localStorage.getItem("book" + curBook.id));
        console.log(bk);
        bk.ownedBy = null;
        bk.available = true;
        localStorage.setItem("book" + bk.id, JSON.stringify(bk));
        localStorage.setItem("chosenBook", JSON.stringify(curBook));
        createMessage("Book has been returned successfully", 1);
    }
    else {
        createMessage("Book is not yours", 0);
    }
    mb.join();
    localStorage.setItem(email+"myBooks", mb)
};

if (returnBtn) returnBtn.addEventListener('click', returnBook);

//edit function
const editBook = () => {
    freeze(editBtn);
    if (curBook === null || curBook.available === false) {
        createMessage("the book was not found", 0);
    }
    else {
        createEditForm();
    }
};

if (editBtn) editBtn.addEventListener("click", editBook);

// validation
function validate() {
    if (img.value != "") {
      var psofdot = img.value.lastIndexOf(".") + 1;
      var imgex = img.value.substring(psofdot);
      return arrofval.includes(imgex);
    }
  }
  function fun() {
    freeze(document.querySelector(".add"));
    if (
      title.value == "" ||
      author.value == "" ||
      description.value == "" ||
      category.value == ""
    ) {
      createMessage("Please fill in all fields before adding the book.", 0);
    }
    else if (validate() == false) {
        createMessage("please enter a picture", 0);
    }
    else if (validate() == true) {
        createMessage("Book has been edited ssuccesfully", 1);

        // erasing the form
        const editFromContainer = document.querySelector(".form-container");

        setTimeout(() => {
            editFromContainer.style.top = "-100%";
        }, 0);
        
        setTimeout(() => {
            document.body.removeChild(editFromContainer);
        }, 2500);

        curBook.title = title.value;
        curBook.cover = imgUrl;
        curBook.description = description.value;
        curBook.category = category.value;
        curBook.author = author.value;

        localStorage.setItem("book" + curBook.id, JSON.stringify(curBook));
        localStorage.setItem("chosenBook", JSON.stringify(curBook));

        fetchData();
    }
  }

  function freeze(btn) {
    btn.disabled = true;
    setTimeout(() => {
        btn.disabled = false;
    }, 2500);
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
    username.innerHTML = `Hello, ${name}`
})