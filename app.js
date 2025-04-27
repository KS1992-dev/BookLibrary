/**
 * books: Array<{
 *  title: string,
 *  author: string,
 *  year: string,
 *  isbn: string,
 *  genre: string
 * }>
 */

// Data model
let books = [
    { title: "The Lord of the Rings", author: "J. R. R. Tolkien", genre: "Fantasy", year: "1954", isbn: "9780544003415" },
    { title: "Beginning Programming For Dummies", author: "Wallace Wang", year: "2006", isbn: "9780470108543" },
    { title: "Propaganda", author: "Edward Bernays", genre: "Nonfiction", year: "2011", isbn: "9783936086355" }
];

const bookForm = document.getElementById("book-form");
const bookTable = document.querySelector("#book-table tbody");
const updateForm = document.getElementById("update-form");
const h2 = document.getElementById("h2");
let bookToEdit = null;

// Render books table
function loadBooks() {
    bookTable.innerHTML = "";
    books.forEach(book => {
        const tr = document.createElement("tr");
        
        ["title", "author", "genre", "year", "isbn"].forEach(prop => {
            const td = document.createElement("td");
            td.textContent = book[prop] || "";
            tr.appendChild(td);
        })
    
        const actionTd = document.createElement("td");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove";
        deleteButton.addEventListener("click", () => {

            books = books.filter(b => b !== book);
            
            loadBooks();

            if (bookToEdit === book) {
                h2.style.display = "none";
                updateForm.style.display = "none";
                updateForm.reset()
                bookToEdit = null;
            }

        })
        actionTd.appendChild(deleteButton);

        const updateButton = document.createElement("button");
            updateButton.textContent = "Update";
            updateButton.addEventListener("click", () => {
                bookToEdit = book;
                h2.style.display = "block";
                updateForm.style.display = "block";

                document.getElementById("update-title").value = book.title;
                document.getElementById("update-author").value = book.author;
                document.getElementById("update-genre").value = book.genre || "";
                document.getElementById("update-year").value = book.year || "";
                document.getElementById("update-isbn").value = book.isbn || "";

        })
        actionTd.appendChild(updateButton);
        
        tr.appendChild(actionTd);
        bookTable.appendChild(tr);
    })
}

loadBooks();


// Add book
bookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const genre = document.getElementById("genre").value.trim();
    const year = document.getElementById("year").value.trim();
    const isbn = document.getElementById("isbn").value.trim();

    if (title === "" || author === "") {
        alert("Both title and author need to be filled.");
        return;
    }

    if (year !== "" && (isNaN(year) || +year < 1000 || +year > 2025 )) {
        alert("Please enter a valid year (1000-2025).");
        return;
    }

    if (isbn !== "" && !/\d{10,13}$/.test(isbn)) {
        alert("ISBN must be 10-13 digits.");
        return;
    }

    const newBook = { title: title, author: author, genre: genre, year: year, isbn: isbn};
    books.push(newBook);

    loadBooks();
    bookForm.reset();

});

// Update book
updateForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const titleUpdate = document.getElementById("update-title").value.trim();
    const authorUpdate = document.getElementById("update-author").value.trim();
    const genreUpdate = document.getElementById("update-genre").value.trim();
    const yearUpdate = document.getElementById("update-year").value.trim();
    const isbnUpdate = document.getElementById("update-isbn").value.trim();

    const updates = [titleUpdate, authorUpdate, genreUpdate, yearUpdate, isbnUpdate];

    if (updates.every(val => val === "")) {
        alert("Fill at least one field to update.");
        return;
    }

    if (yearUpdate !== "" && (isNaN(yearUpdate) || +yearUpdate < 1000 || +yearUpdate > 2025 )) {
        alert("Please enter a valid year (1000-2025).");
        return;
    }

    if (isbnUpdate !== "" && !/\d{10,13}$/.test(isbnUpdate)) {
        alert("ISBN must be 10-13 digits.");
        return;
    }

    if (titleUpdate !== "") {
        bookToEdit.title = titleUpdate;
    }
    if (authorUpdate !== "") {
        bookToEdit.author = authorUpdate;
    }
    if (genreUpdate !== "") {
        bookToEdit.genre = genreUpdate || "";    
    }
    if (yearUpdate !== "") {
        bookToEdit.year = yearUpdate || "";
    }
    if (isbnUpdate !== "") {
        bookToEdit.isbn = isbnUpdate || "";
    }


    loadBooks();

    h2.style.display = "none";
    updateForm.style.display = "none";
    updateForm.reset();

}) 