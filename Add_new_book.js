var title = document.getElementById("name");
var author = document.getElementById("author");
var description = document.getElementById("des");
var category = document.getElementById("book");
var img = document.forms["myform"]["inpfile"];
var arrofval = ["png", "jpg", "svg", "jpeg", "gif"];
function validate() {
  if (img.value != "") {
    var psofdot = img.value.lastIndexOf(".") + 1;
    var imgex = img.value.substring(psofdot);
    res = arrofval.includes(imgex);
    if (res == false) {
      alert("Please enter an image");
      return false;
    } else {
      return true;
    }
  }
}
function fun() {
  if (
    title.value != "" &&
    author.value != "" &&
    description.value != "" &&
    category.value != "" &&
    validate() == true
  ) {
    alert("Book has been added ssuccesfully");
  } else {
    alert("Please fill in all fields before adding the book.");
  }
}
