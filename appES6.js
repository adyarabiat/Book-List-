class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addInstansToUI(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = "#" class = "delete"> X </a></td>
  `;
    list.appendChild(row);
  }

  clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  showAlert(message, className) {
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

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2000);
  }
}

// Local storage class

class Store {
  static getFromLS(book) {
    let books;

    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addtoLS(book) {
    const books = Store.getFromLS(book);
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static displayOnUI() {
    const books = Store.getFromLS();

    books.forEach(function (book) {
      const ui = new UI();

      // Add book to UI
      ui.addInstansToUI(book);
    });
  }

  static removeFromLS(isbn) {
    const books = Store.getFromLS();
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Reload the DOM
document.addEventListener("DOMContentLoaded", Store.displayOnUI);

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

  // Add to Local Storage
  Store.addtoLS(book);

  //  1.To not add if it's empty 2.To show alert
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill all the information", "error");
  } else {
    ui.addInstansToUI(book); //
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

    // Remove from Local storage

    Store.removeFromLS(
      e.target.parentElement.previousElementSibling.textContent
    ); //So this will go to the target then to the parent of it then to the previuse html tag so we get the isbn
  }

  e.preventDefault();
});
