let libraryBooks = [];

const newBookBtn = document.querySelector('.newbook'); 
const showBooks = document.querySelector('.show-books');
const bookForm = document.querySelector('.book-form');
const cardClose = document.querySelectorAll('.cardclose');
const openEls = document.querySelectorAll("[data-open]"); // for popup boxes
const closeEls = document.querySelectorAll("[data-close]"); // for popup boxes
const submitBtn = document.querySelector('.submitbtn')
const formBoxes = document.querySelectorAll('.form-box');
const isVisible = "is-visible"; // for popup boxes

if (localStorage.getItem('books') === null) {
  libraryBooks = [];
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem('books'));
  libraryBooks = booksFromStorage;
}


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
    let alertWords = document.querySelector('.alertwords');
    let bookRead = document.querySelector("#book-read");
    

    let modalBox = document.querySelector('.modal');

    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.value);

    if(bookTitle.value.length === 0 || bookAuthor.value.length === 0 || bookPages.value.length === 0) {
        alertWords.textContent = "Please fill in all fields.";
    } else {
        alertWords.textContent = "";
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
    formBoxes.forEach(formBox => {
        formBox.value = "";
    });

    libraryBooks.push(newBook);

    const newCard = document.createElement('div');
    let newCardTitle = document.createElement('h4');
    let newCardAuthor = document.createElement('p');
    let newCardPages = document.createElement('p');
    let newCardRead = document.createElement('span');
    newCard.classList.add('isVisible', 'cardbox');
    showBooks.appendChild(newCard);
    for(let i = 0; i < libraryBooks.length; i++) {
        newCardTitle.innerHTML = `${libraryBooks[i].title}`;
        newCardTitle.innerHTML += "<button type='button' class='close' onclick='$(this).parent().parent().remove();'>×</button>"
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