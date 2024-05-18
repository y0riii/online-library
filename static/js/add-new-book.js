// var titleInput = document.getElementById("name");
// var authorInput = document.getElementById("author");
// var descriptionInput = document.getElementById("des");
// var categoryInput = document.getElementById("book");
// var imgInput = document.querySelector(".inpfile")
// let img = null;
// const photo = document.querySelector(".photo")
// const username = document.querySelector(".username")
// const logout = document.querySelector(".logout")
// const myBooks = document.querySelector(".my-books")
// const addBook = document.querySelector(".add-book")
// let isAdmin = localStorage.getItem("role")
// if(isAdmin == "on") isAdmin = true;
// else isAdmin = false;

// function fun() {
//   let title = titleInput.value;
//   let author = authorInput.value;
//   let description = descriptionInput.value;
//   let category = categoryInput.value;
  
//   if (
//     title.value != "" &&
//     author.value != "" &&
//     description.value != "" &&
//     category.value != "" &&
//     img != null
//   ) {
//     let bookCount = localStorage.getItem("book-count");
//     if (bookCount === null) {
//       localStorage.setItem("book-count", 0);
//     }
//     bookCount = parseInt(localStorage.getItem("book-count"));
//     let book = {
//       id:bookCount + 1,
//       title: title,
//       author: author,
//       description: description,
//       category: category,
//       cover: img,
//       ownedBy: null,
//       available: true,
//     }
//     localStorage.setItem("book" + book.id, JSON.stringify(book)) 
//     localStorage.setItem("book-count", bookCount + 1)
//     alert("The book has been added successfully.")
//   } else {
//     alert("Please fill in all fields before adding the book.");
//   }
// }

// // ../images/name

// imgInput.addEventListener('change', function(event) {
//   let path = imgInput.value
//   let lastIndex = path.lastIndexOf("\\");
//   let s = path.substring(lastIndex + 1)
//   s = "images/" + s;
//   img = s;
// });

// photo.addEventListener("click", () => {
//   imgInput.click()
// })

// logout.addEventListener("click", () => {
//   localStorage.removeItem("loggedIn-email")
//   localStorage.removeItem("loggedIn-username")
//   localStorage.removeItem("role")
//   window.location.href = "./login.html"
// })

// document.addEventListener("DOMContentLoaded", () => {
//   let name = localStorage.getItem("loggedIn-username")
//   if(isAdmin) myBooks.style.display = "none";
//   else addBook.style.display = "none"
//   username.innerHTML = `Hello, ${name}`
// })