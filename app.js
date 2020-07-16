// Book Constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor

function UI() {}

// Make the prototype for UI
UI.prototype.addInstansToUI = function (book) {
  const list = document.querySelector("#book-list");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = "#" class = "delete"> X </a></td>
  `;
  list.appendChild(row);
};

// to clear the fields
UI.prototype.clearFields = function () {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#isbn").value = "";
};

UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement("div");
  // give it a class name
  div.className = `alert ${className}`;
  // pass the message inside it
  div.appendChild(document.createTextNode(message));

  // we select the container and the form to insert it before
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  container.insertBefore(div, form); //we say the container then we pass first what we want to insert then what is beofre

  // TimeOut   So here we pass the function inside it then the seconds
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 2000);
};

// Listen to our Events

// 1. Event listner for the book
document.querySelector("#book-form").addEventListener("submit", function (e) {
  // Get the values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  const book = new Book(title, author, isbn);

  // add instanses to the UI
  const ui = new UI();

  //  1.To not add if it's empty 2.To show alert
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill all the information", "error");
  } else {
    ui.addInstansToUI(book); // We pass the prototype method and then the book

    // Clear the field after submit.
    ui.clearFields();

    ui.showAlert("Book Added", "success");
  }

  e.preventDefault();
});

// Event listner for the delete

document.querySelector("#book-list").addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    e.target.parentElement.parentElement.remove();

    // We have to define the ui again here so we will have access to the prototype
    const ui = new UI();
    ui.showAlert("Book Removed!", "success");
  }

  e.preventDefault();
});
