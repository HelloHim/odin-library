const myLibrary = [];

function Book(name, author, readStatus) {
  this.name = name;
  this.author = author;
  this.readStatus = readStatus;
}

function addBookToLibrary(name, author, readStatus) {
  const newBook = new Book(name, author, readStatus);
  let uuid = crypto.randomUUID();
  newBook.id = uuid;
  myLibrary.push(newBook);
}