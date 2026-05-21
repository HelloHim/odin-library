// Array to store all books in the library
const myLibrary = [];

// Constructor function to create a new Book object
function Book(id, name, author, status) {
  this.id = id; // unique identifier (UUID)
  this.name = name;
  this.author = author;
  this.status = status; // boolean: true = read, false = not read
}

// Adds a new book to the library and updates the display
function addBookToLibrary(name, author, status) {
  // Generate a unique identifier for this book using the Crypto API,
  // and limit it to only 5 characters.
  let uuid = crypto.randomUUID().substring(1, 6);

  // Create a new Book object with the provided information
  const newBook = new Book(uuid, name, author, status);

  // Add the new book to the library array
  myLibrary.push(newBook);

  // Refresh the table to display the updated library
  createBookTable(myLibrary);
}

// Populates the HTML table with all books in the library
function createBookTable(myLibrary) {
  // Get reference to the table element from the HTML
  const table = document.getElementById("libraryTable");

  // Add column headers based on book properties, but only when the first book is added
  if (myLibrary.length == 1) {
    getColumnHeaders(table, myLibrary);
  }

  // Get the table body where rows will be added
  const tbody = table.tBodies[0];

  // Loop through each book in the library, skipping all but the last entry
  // to avoid duplicating rows already in the table on each addBookToLibrary call
  myLibrary.forEach((objectElement, index) => {
    if (index + 1 < myLibrary.length) {
      return;
    }
    // Create a new row in the table for this book
    const newRow = tbody.insertRow(0);

    // Store the book's unique ID on the row element so the delete handler
    // can match it back to the correct entry in the myLibrary array
    newRow.dataset.id = objectElement.id;

    // Loop through each property of the book (id, name, author, status)
    for (const key in objectElement) {
      // Create a new cell in the row
      const cell = newRow.insertCell();

      // Add the book property value to the cell
      cell.textContent = objectElement[key];

      // Override with readable text if the value is a boolean status
      if (objectElement[key] === true) {
        cell.textContent = "Read";
      } else if (objectElement[key] === false) {
        cell.textContent = "Not Read";
      }
    }

    // Create button element
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Delete";
    btn.className = "deleteButton";

    // Append button element to last cell of current row
    const cell = newRow.insertCell();
    cell.append(btn);
  });
}

// Creates and populates table column headers from book properties
function getColumnHeaders(table, myLibrary) {
  // Get the table head section
  const thead = table.tHead;

  // Insert a new row at the top of the thead for headers
  const newHeaderRow = thead.insertRow(0);

  // Get all property names from the first book in the MyLibrary array
  // (id, name, author, status) and create a header cell for each one
  const myLibraryKeys = Object.keys(myLibrary[0]);
  Object.keys(myLibrary[0]).forEach((element, index) => {
    // Create a new cell in the header row
    const cell = newHeaderRow.insertCell(index);

    // Add the property name to the cell with first letter capitalised
    cell.textContent = element.charAt(0).toUpperCase() + element.slice(1);
  });
}

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop page from reloading

  // Read form values
  const bookName = document.querySelector("#bookName").value;
  const author = document.querySelector("#author").value;
  // Use let so we can reassign to a boolean below
  let readStatus = document.querySelector("#readStatus").value;

  // Convert the select string value ("read"/"notRead") to a boolean
  if (readStatus == "read") {
    readStatus = true;
  } else {
    readStatus = false;
  }

  addBookToLibrary(bookName, author, readStatus);
});

// Handle delete button clicks via event delegation on the table
// One listener covers all rows, including ones added after page load
document.getElementById("libraryTable").addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const row = event.target.closest("tr");

    // Read the ID stored in data-id to find the matching book in the array
    const bookRowId = row.dataset.id;
    const index = myLibrary.findIndex((book) => book.id === bookRowId);

    // Remove the book from the MyLibrary array,
    myLibrary.splice(index, 1);
    // Remove this row in the  directly from the DOM (remove row from the table on screen)
    row.remove();
  }
});

// test
addBookToLibrary("Harry Potter & the Curse of the Honoured One", "Gojo", true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", true);
// addBookToLibrary("To Kill a Mockingbird", "Harper Lee", false);
// addBookToLibrary("1984", "George Orwell", true);
// addBookToLibrary("Pride and Prejudice", "Jane Austen", false);
// addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", true);
// addBookToLibrary("Brave New World", "Aldous Huxley", false);
// addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", true);
// addBookToLibrary("Dune", "Frank Herbert", false);
// addBookToLibrary("The Hobbit", "J.R.R. Tolkien", true);
