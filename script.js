let libraryBooks = []; // Array of book objects


// Linking DOM elements
const newBookBtn = document.querySelector('.newbook'); // New Book button
const showBooks = document.querySelector('.show-books'); // div container
const cardClose = document.querySelectorAll('.cardclose'); // button to close card
const openEls = document.querySelectorAll("[data-open]"); // for popup boxes
const closeEls = document.querySelectorAll("[data-close]"); // for popup boxes
const submitBtn = document.querySelector('.submitbtn'); // Submit button (in popup boxes)
const formBoxes = document.querySelectorAll('.form-box'); // Form box within popup box
const isVisible = "is-visible"; // for popup boxes


// If the 'books' key is empty, simply set libraryBooks to empty array.
if (localStorage.getItem('books') === null) {
  libraryBooks = [];

// Otherwise, set library books array to get items from the 'books' key
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem('books'));
  libraryBooks = booksFromStorage;
}

// Add 'click' event to Submit button. Run addBookToLibrary function.
submitBtn.addEventListener('click', addBookToLibrary);


// Book component
function Book(title, author, pages, read) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
	this.info = function() {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`;
	}
}

// 
function reAddBook(book) {
  let bookTitle = book.title;
  let bookAuthor = book.author;
  let bookPages = book.pages;
  let bookRead = book.read;

  const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.value);


}



// Add book to library
function addBookToLibrary(arr) {
    let bookTitle = document.querySelector('#book-title');
    let bookAuthor = document.querySelector('#book-author');
    let bookPages = document.querySelector('#book-pages');
    let alertWords = document.querySelector('.alertwords'); // Alert if form elements are empty
    let bookRead = document.querySelector("#book-read"); 
    

    let modalBox = document.querySelector('.modal');

    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.value);

    // If elements are empty, throw alert
    if(bookTitle.value.length === 0 || bookAuthor.value.length === 0 || bookPages.value.length === 0) {
        alertWords.textContent = "Please fill in all fields.";
    } else {
        alertWords.textContent = "";
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
    formBoxes.forEach(formBox => {
        formBox.value = "";
    });

    // Push new book to libraryBooks array
    libraryBooks.push(newBook);

    // Create card on page
    const newCard = document.createElement('div');
    let newCardTitle = document.createElement('h4');
    let newCardAuthor = document.createElement('p');
    let newCardPages = document.createElement('p');
    let newCardRead = document.createElement('span');
    newCard.classList.add('isVisible', 'cardbox');
    showBooks.appendChild(newCard);
    for(let i = 0; i < libraryBooks.length; i++) {
        newCardTitle.innerHTML = `${libraryBooks[i].title}`;
        newCardTitle.innerHTML += "<button type='button' class='close' onclick='$(this).parent().parent().remove();'>×</button>";
        newCardAuthor.innerHTML = `${libraryBooks[i].author}`;
        newCardPages.innerHTML = `${libraryBooks[i].pages}`;
        newCardRead.innerHTML = `${libraryBooks[i].read}`;
    }
    newCard.appendChild(newCardTitle);
    newCard.appendChild(newCardAuthor);
    newCard.appendChild(newCardPages);
    newCardRead.innerHTML = '<select id="book-read"><option name="select" disabled selected>Select one</option><option name="yes">Yes</option><option name="no">No</option></select>';
    newCard.appendChild(newCardRead);
}

    // Run updateLocalStorage to update the local storage every time a new book is added
    updateLocalStorage();
}



// Stuff for popup capability

for (const el of openEls) {
  el.addEventListener("click", function() {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (const el of closeEls) {
  el.addEventListener("click", function() {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

document.addEventListener("click", e => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

document.addEventListener("keyup", e => {
  // if we press the ESC
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

cardClose.forEach(card => {
    card.addEventListener('click', function() {
        this.parentNode.parentNode.removeChild(this.parentNode.parentNode);
        return false;
    })
})




function updateLocalStorage() {
  localStorage.setItem('books', JSON.stringify(libraryBooks));
}

function loadLocalStorage() {
  var storedArray = localStorage.getItem("books");
  ourArray = JSON.parse(storedArray);
}