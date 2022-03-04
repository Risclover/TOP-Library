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

// localstorage buttons (save and delete)

const saveStorage = document.getElementById('save-storage');
const deleteStorage = document.getElementById('delete-storage');

let libraryBooks = [];

saveStorage.addEventListener('click', updateLocalStorage);
deleteStorage.addEventListener('click', deleteLocalStorage);

// If the 'books' key is empty, simply set libraryBooks to empty array.
if (localStorage.getItem('books') === null) {
    libraryBooks = [];
  
// Otherwise, set library books array to get items from the 'books' key
} else {
    const booksFromStorage = JSON.parse(localStorage.getItem('books'));
    libraryBooks = booksFromStorage;
}

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
  let bookReadYes = document.querySelector('#bookreadyes')
  let bookReadNo = document.querySelector('#bookreadno');
  let bookRead;
  let alertWords = document.querySelector('.alertwords'); // Alert if form elements are empty

  if(bookReadYes.checked) {
      bookRead = 'Read';
  } else if (bookReadNo.checked) {
      bookRead = 'Not read';
  }

  let newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead);


  // If any form elements are empty, throw error and don't submit book.
  if (bookTitle.value.length === 0 || bookAuthor.value.length === 0 || bookPages.value.length === 0) {
      alertWords.textContent = 'Please fill in all fields.';
  } else {
      alertWords.textContent = '';
      document.querySelector('.modal.is-visible').classList.remove(isVisible);
      formBoxes.forEach(formBox => {
          formBox.value = "";
      });
      formRadio1.checked = true;

      // Push new book object into libraryBooks array
      libraryBooks.push(newBook);
      
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

function updateLocalStorage() {
    localStorage.setItem('books', JSON.stringify(libraryBooks));
}

function deleteLocalStorage() {
    window.localStorage.clear();
}

const data = JSON.parse(localStorage.getItem('books'));

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


for(let i = 0; i < data.length; i++) {
    loadLocalStorage(data, data[i]);
    
}