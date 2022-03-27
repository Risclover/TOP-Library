// Link DOM elements
const newBookBtn = document.querySelector('.newbook'); // New Book button
const showBooks = document.querySelector('.show-books'); // div container
const cardClose = document.querySelectorAll('.cardclose'); // button to close card
const openEls = document.querySelectorAll("[data-open]"); // for popup boxes
const closeEls = document.querySelectorAll("[data-close]"); // for popup boxes
const submitBtn = document.querySelector('.submitbtn'); // Submit button (in popup boxes)
const formBoxes = document.querySelectorAll('.form-box'); // Form box within popup box
const formRadio1 = document.querySelector('#bookreadyes'); // Form radio buttons within popup box
const isVisible = "is-visible"; // for popup boxes
const colorDropdown = document.querySelector('select'); // Color-picking dropdown in popup boxes
let libraryBooks = [];

// localstorage buttons (save and delete)
const saveStorage = document.getElementById('save-storage');
const deleteStorage = document.getElementById('delete-storage');

// Button event listeners
saveStorage.addEventListener('click', updateLocalStorage);
deleteStorage.addEventListener('click', deleteLocalStorage);
submitBtn.addEventListener('click', addBookToLibrary);


// If the 'books' key is empty, simply set libraryBooks to empty array.
if (localStorage.getItem('books') === null) {
    libraryBooks = [];

// Otherwise, set library books array to get items from the 'books' key
} else {
    const booksFromStorage = JSON.parse(localStorage.getItem('books'));
    libraryBooks = booksFromStorage;
}


// The Book constructor
function Book(title, author, pages, read, color) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.color = color
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`;
  }
}


// Add book to library function.
function addBookToLibrary() {
  let bookTitle = document.querySelector('#book-title');
  let bookAuthor = document.querySelector('#book-author');
  let bookPages = document.querySelector('#book-pages');
  let bookReadYes = document.querySelector('#bookreadyes')
  let bookReadNo = document.querySelector('#bookreadno');
  let alertWords = document.querySelector('.alertwords'); // Alert if form elements are empty
  let bookRead;


  if(bookReadYes.checked) {
      bookRead = 'Read';
  } else if (bookReadNo.checked) {
      bookRead = 'Not read';
  }

  // Creating a new book object via the Book constructor
  let newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead);

  // If any form elements are empty, throw error and don't submit book. If none of them are empty, proceed.
  if (bookTitle.value.length === 0 || bookAuthor.value.length === 0 || bookPages.value.length === 0) {
      alertWords.textContent = 'Please fill in all fields.';
  } else {
      alertWords.textContent = ''; 
      document.querySelector('.modal.is-visible').classList.remove(isVisible); // Closes the modal
      formBoxes.forEach(formBox => {
          formBox.value = "";           // Sets the form values so they're blank the next time the New Book button is pressed
      });
      formRadio1.checked = true; // Set the radio buttons so that the "Yes" button is automatically selected (otherwise, the user's last choice will be selected)

      // Push the new book object into libraryBooks array
      libraryBooks.push(newBook);
      
      // The rest of the lines of code in this function create the actual book card on page
      const newCard = document.createElement('div');
      const newCardTitle = document.createElement('h4');
      const newCardAuthor = document.createElement('p');
      const newCardPages = document.createElement('p');
      const newCardRead = document.createElement('span');

      newCardTitle.setAttribute('class', 'title-style');
      newCardAuthor.setAttribute('class', 'author-style');
      newCardPages.setAttribute('class', 'pages-style');
      newCardRead.setAttribute('class', 'read-style');
      
      newCard.classList.add('isVisible', 'cardbox', colorPicker());
      showBooks.appendChild(newCard);
      
      for(let i = 0; i < libraryBooks.length; i++) {
          newCardTitle.innerHTML = `${libraryBooks[i].title}`;
          let closeBtn = "<button type='button' class='close-default' onclick='$(this).parent().parent().remove();'>x</button>";
          newCardTitle.innerHTML += closeBtn;
          newCardAuthor.innerHTML = `by ${libraryBooks[i].author}`;
          newCardPages.innerHTML = `<strong>Pages</strong>: ${libraryBooks[i].pages}`;
          newCardRead.innerHTML = `<strong>Status</strong>: ${libraryBooks[i].read}`;
      }
      
      newCard.appendChild(newCardTitle);
      newCard.appendChild(newCardAuthor);
      newCard.appendChild(newCardPages);
      newCard.appendChild(newCardRead);
    
   

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


// Switch function for setting the background color of the book's card
function colorPicker() {
    switch(colorDropdown.value) {
        case 'red':
            return 'cardback-red';
            break;
        case 'orange':
            return 'cardback-orange';
            break;
        case 'yellow':
            return 'cardback-yellow';
            break;
        case 'green':
            return 'cardback-green';
            break;
        case 'blue':
            return 'cardback-blue';
            break;
        case 'purple':
            return 'cardback-purple';
            break;
        case 'dark':
            return 'cardback-dark';
            break;
        case 'grey':
            return 'cardback-grey';
            break;
        default:
            return 'cardback-white';
            break;
    }
}


// Update local storage
function updateLocalStorage() {
    localStorage.setItem('books', JSON.stringify(libraryBooks));
}


// Delete local storage
function deleteLocalStorage() {
    window.localStorage.clear();
    showBooks.textContent = "";
}


// Get localStorage data and set it to the variable "data"
const data = JSON.parse(localStorage.getItem('books'));

// Load the saved local storage objects into cards (almost identical to addBookToLibrary())
function loadLocalStorage(array, book) {
    let bookTitle;
    let bookAuthor;
    let bookPages;
    let bookRead;
    for(let i = 0; i < array.length; i++) {
        bookTitle = book.title;
        bookAuthor = book.author;
        bookPages = book.pages;
        bookRead = book.read;
    }

     // Create book card on page
     const newCard = document.createElement('div');
     const newCardTitle = document.createElement('h4');
     const newCardAuthor = document.createElement('p');
     const newCardPages = document.createElement('p');
     const newCardRead = document.createElement('span');

     newCardTitle.setAttribute('class', 'title-style');
     newCardAuthor.setAttribute('class', 'author-style');
     newCardPages.setAttribute('class', 'pages-style');
     newCardRead.setAttribute('class', 'read-style');
     
     newCard.classList.add('isVisible', 'cardbox', colorPicker());
     showBooks.appendChild(newCard);
     
     for(let i = 0; i < array.length; i++) {
         newCardTitle.innerHTML = `${bookTitle}`;
         let closeBtn = "<button type='button' class='close-default' onclick='$(this).parent().parent().remove();'>x</button>";
         newCardTitle.innerHTML += closeBtn;
         newCardAuthor.innerHTML = `by ${bookAuthor}`;
         newCardPages.innerHTML = `<strong>Pages</strong>: ${bookPages}`;
         newCardRead.innerHTML = `<strong>Status</strong>: ${bookRead}`;
     }
     
     newCard.appendChild(newCardTitle);
     newCard.appendChild(newCardAuthor);
     newCard.appendChild(newCardPages);
     newCard.appendChild(newCardRead);
}

// Required in order to load saved books onto page
for(let i = 0; i < data.length; i++) {
    loadLocalStorage(data, data[i]);
}