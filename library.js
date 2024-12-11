const myLibrary = [
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 310, read: false },
    { title: '1984', author: 'George Orwell', pages: 328, read: true }
];

// Book object constructor
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read ? "read" : "not read yet";
    }
    
};

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

// Add books to library logic
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook);
    displayBooks();
};

// Display books logic
function displayBooks() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = ''; // clears previous content in div

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        bookCard.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
        <button class='remove-btn' type='submit' data-index='${index}'>Remove</button>
        <button class='toggle-read-btn' data-index='${index}'>Toggle Read Status</button>
        `;

        libraryDiv.appendChild(bookCard);
    });

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            removeBook(index);
        });
    });

    // Add event listeners to toggle buttons
    const toggleReadBtn = document.querySelectorAll('.toggle-read-btn');
    toggleReadBtn.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            myLibrary.indexOf(index).toggleReadStatus();
            displayBooks();
        });
    });
};

// Remove/delete book logic
function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
};

// Modal functionality for adding a new book
const modal = document.getElementById('newBookModal');
const btn = document.getElementById('newBookBtn');
const span = document.getElementsByClassName('close')[0];

// When Add new book button is clicked
btn.onclick = function() {
    modal.style.display = 'block';
};

// When the x (close) is pressed
span.onclick = function() {
    modal.style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Form submission
document.getElementById('newBookForm').addEventListener('submit',
    function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.getElementById('read').checked;
        addBookToLibrary(title, author, pages, read);
        modal.style.display = 'none';
        this.reset();
});

// Initial display
displayBooks();
modal.style.display = 'none';
console.log(myLibrary);