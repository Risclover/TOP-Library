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
let libraryBooks = [], automaticallyUpdate = true; //change automaticallyUpdate to false to prevent automatic saving(on changes)


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
function Book({title, author, pages, read, color}) {
  this.title = String(title)
  this.author = String(author)
  this.pages = Number(pages)
  this.read = read?"Read":"Not Read"
  this.color = String(color)
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read} with color ${this.color}`;
  }
}

//returns your close button with a listener that actually removes the book
//"<button type='button' class='close-default' onclick='$(this).parent().parent().remove();'>x</button>";
function closeBar(book){
  var btn=document.createElement('button')
  btn.className='close-default'
  btn.innerHTML='x' //wow almost forgot this
  btn.addEventListener('click',()=>{
    $(btn).parent().parent().remove()
    libraryBooks.splice(libraryBooks.indexOf(book),1)
    if(automaticallyUpdate){updateLocalStorage()} //automatic saving
  })
  return btn //the button is returned to be placed in its arrangement
}


// Add book to library function.
function addBookToLibrary() {
  let color = colorDropdown.value;
  let bookTitle = document.querySelector('#book-title');
  let bookAuthor = document.querySelector('#book-author');
  let bookPages = document.querySelector('#book-pages');
  let bookRead = document.querySelector('#bookreadyes').checked; //true if checked, false if not checked
  let alertWords = document.querySelector('.alertwords'); // Alert if form elements are empty
    
  // Creating a new book object via the Book constructor
  let newBook = new Book({title:bookTitle.value, author:bookAuthor.value, pages:bookPages.value, read:bookRead, color});


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
      
      newCard.classList.add('isVisible', 'cardbox', colorPicker(newBook.color));
      showBooks.appendChild(newCard);
      
      for(let i = 0; i < libraryBooks.length; i++) {
          newCardTitle.innerHTML = `${libraryBooks[i].title}`;
          let closeBtn = closeBar(newBook)
          newCardTitle.appendChild(closeBtn);
          newCardAuthor.innerHTML = `by ${libraryBooks[i].author}`;
          newCardPages.innerHTML = `<strong>Pages</strong>: ${libraryBooks[i].pages}`;
          newCardRead.innerHTML = `<strong>Status</strong>: ${libraryBooks[i].read}`;
      }
      
      newCard.appendChild(newCardTitle);
      newCard.appendChild(newCardAuthor);
      newCard.appendChild(newCardPages);
      newCard.appendChild(newCardRead);
      
      if(automaticallyUpdate){updateLocalStorage()} //automatic saving

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
let colors = {red:1, orange:1, yellow:1, green:1, blue:1, purple:1, dark:1, grey:1}
//the above variable saves a lot of lines in the colorPicker function
function colorPicker(color) {
    if(!colors[color]){return 'cardback-white'}
    return 'cardback-'+color
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
const data = JSON.parse(localStorage.getItem('books'))||[]
// the "||" in case there was nothing stored yet and it prevents an error from reading map from null
.map(book=>new Book( book )) //convert localStorage data to a list of "Book"s

// Load the saved local storage objects into cards (almost identical to addBookToLibrary())
function loadLocalStorage(array, book) {
    // 'var' can be used like this because they only stay in the scopes of their functions
    // 'let' stays in the scopes of lots of code blocks(for,while,if,else,try,catch,etc)
    for(let i = 0; i < array.length; i++) {
        var bookTitle = book.title;
        var bookAuthor = book.author;
        var bookPages = book.pages;
        var bookRead = book.read;
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
     
     newCard.classList.add('isVisible', 'cardbox', colorPicker(book.color));
     showBooks.appendChild(newCard);
     
     for(let i = 0; i < array.length; i++) {
         newCardTitle.innerHTML = `${bookTitle}`;
         let closeBtn = closeBar(book)
         newCardTitle.appendChild(closeBtn);
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
