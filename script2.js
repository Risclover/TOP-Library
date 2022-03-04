// Link DOM elements
const newBookBtn = document.querySelector('.newbook'); // New Book button
const showBooks = document.querySelector('.show-books'); // div container
const cardClose = document.querySelectorAll('.cardclose'); // button to close card
const openEls = document.querySelectorAll("[data-open]"); // for popup boxes
const closeEls = document.querySelectorAll("[data-close]"); // for popup boxes
const submitBtn = document.querySelector('.submitbtn'); // Submit button (in popup boxes)
const formBoxes = document.querySelectorAll('.form-box'); // Form box within popup box
const isVisible = "is-visible"; // for popup boxes

let libraryBooks = [];

submitBtn.addEventListener('click', addBookToLibrary);

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`;
  }
}


// Add book to library function.
function addBookToLibrary() {
  let bookTitle = document.querySelector('#book-title');
  let bookAuthor = document.querySelector('#book-author');
  let bookPages = document.querySelector('#book-pages');
  let bookRead = document.querySelector('#book-read');
  let alertWords = document.querySelector('.alertwords'); // Alert if form elements are empty
  let newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.value);


  // If any form elements are empty, throw error and don't submit book.
  if (bookTitle.value.length === 0 || bookAuthor.value.length === 0 || bookPages.value.length === 0) {
      alertWords.textContent = 'Please fill in all fields.';
  } else {
      alertWords.textContent = '';
      document.querySelector('.modal.is-visible').classList.remove(isVisible);
      formBoxes.forEach(formBox => {
          formBox.value = "";
      });
      // Push new book object into libraryBooks array
      libraryBooks.push(newBook);
      
      // Create book card on page
      const newCard = document.createElement('div');
      const newCardTitle = document.createElement('h4');
      const newCardAuthor = document.createElement('p');
      const newCardPages = document.createElement('p');
      const newCardRead = document.createElement('span');
      
      newCard.classList.add('isVisible', 'cardbox');
      showBooks.appendChild(newCard);
      
      for(let i = 0; i < libraryBooks.length; i++) {
          newCardTitle.innerHTML = `${libraryBooks[i].title}`;
          newCardTitle.innerHTML += "<button type='button' class='close' onclick='$(this).parent().parent().remove();'>x</button>";
          newCardAuthor.innerHTML = `${libraryBooks[i].author}`;
          newCardPages.innerHTML = `${libraryBooks[i].pages}`;
          newCardRead.innerHTML = `${libraryBooks[i].read}`;
      }
      
      newCard.appendChild(newCardTitle);
      newCard.appendChild(newCardAuthor);
      newCard.appendChild(newCardPages);
      newCard.appendChild(newCardRead);

      updateLocalStorage();
   }
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

// Keyboard shortvut for modal: ESC key to close
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
    });
})

function updateLocalStorage() {
    localStorage.setItem('books', JSON.stringify(libraryBooks));
}