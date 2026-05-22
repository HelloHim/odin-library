# Odin Book Library

A browser-based personal library tracker built as part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-library) JavaScript curriculum.

## Features

- Add books to your library with a title, author, and read status
- Books are displayed in a clean, responsive table
- Toggle a book's read status directly from the table
- Delete any book from the library
- Each book is assigned a unique ID via `crypto.randomUUID()` so removals and reorders stay stable

## Tech

- HTML
- CSS (responsive form layout using the Holy Albatross flexbox technique)
- Vanilla JavaScript (constructor functions, prototype methods, event delegation)

## Concepts Practiced

- Constructor functions and prototype methods (`Book`, `Book.prototype.changeReadStatus`)
- Separating data (the `myLibrary` array) from the display logic (DOM rendering)
- Using `data-*` attributes to link DOM rows back to their book objects
- Event delegation on the table for delete and read-status toggling
- `event.preventDefault()` to handle form submission without a page reload

## Project Page

[The Odin Project: Library](https://www.theodinproject.com/lessons/node-path-javascript-library)
