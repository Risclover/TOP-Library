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
const instructionsBtn = document.querySelector('.instructions');
const infoBoxes = document.querySelectorAll('.info');
const expandBtn = document.querySelector('.material-icons');
var slider = document.querySelector('.slider');


instructionsBtn.addEventListener('click', function() {
    if(expandBtn.innerHTML === "keyboard_arrow_down") {
        expandBtn.innerHTML = "keyboard_arrow_up";
    } else {
        expandBtn.innerHTML = "keyboard_arrow_down"; 
    }
    $(".slider").toggle("slide");

})

// localstorage buttons (save and delete)
const deleteStorage = document.getElementById('delete-storage');

// Button event listeners
deleteStorage.addEventListener('click', deleteLocalStorage);
submitBtn.addEventListener('click', addBookToLibrary);


// The Book constructor
function Book({title, author, pages, read, color}) {
  this.title = String(title)
  this.author = String(author)
  this.pages = Number(pages)
  this.read = read?"Yes":"No"
  this.color = String(color)
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read} with color ${this.color}`;
  }
}

//returns your close button with a listener that actually removes the book
//"<button type='button' class='close-default' onclick='$(this).parent().parent().remove();'>x</button>";
function closeBar(book){
  let btn=document.createElement('button')
  btn.className='close-default';
  btn.innerHTML='x' //wow almost forgot this
  btn.addEventListener('click',()=>{
    $(btn).parent().parent().remove()
    console.log(book,libraryBooks,libraryBooks.indexOf(book))
    libraryBooks.splice(libraryBooks.indexOf(book),1)
    if(automaticallyUpdate){updateLocalStorage()} //automatic saving
  })
  return btn //the button is returned to be placed in its arrangement
}

function toggleRead(read) {
    let btn = document.createElement('button');
    btn.className = 'read-toggle';
    btn.addEventListener('click', function() {
        if(btn.innerHTML === 'Read') {
            btn.innerHTML = 'Not read';
        } else {
            btn.innerHTML = 'Read';
        }
    })
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

      const {title,author,pages,read}=newBook
      newCardTitle.innerHTML = `${title}`;
      let closeBtn = closeBar(newBook)
      newCardTitle.appendChild(closeBtn);
      newCardAuthor.innerHTML = `by ${author}`;
      newCardPages.innerHTML = `<strong>Pages</strong>: ${pages}`;
      newCardRead.innerHTML = `<strong>Read</strong>: ${read}`;
    
      // update book status
      newCardRead.addEventListener("click", () => {
        if (newCardRead.innerHTML === "<strong>Read</strong>: Yes") {
            newCardRead.innerHTML = "<strong>Read</strong>: No";
            newBook.read = "No";
            localStorage.setItem("books", JSON.stringify(libraryBooks));
        } else {
            newCardRead.innerHTML = "<strong>Read</strong>: Yes";
            newBook.read = "Yes";
            localStorage.setItem("books", JSON.stringify(libraryBooks));
        }
    });

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
function loadLocalStorage({title,author,pages,read,color}) {
    // EDIT: the for loops in this function are seemingly useless    
    var newBook=arguments[0]
    libraryBooks.push(newBook)
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
    
    newCard.classList.add('isVisible', 'cardbox', colorPicker(color));
    showBooks.appendChild(newCard);
     
    
    newCardTitle.innerHTML = `${title}`;
    const closeBtn = closeBar(newBook);
    newCardTitle.appendChild(closeBtn);
    newCardAuthor.innerHTML = `by ${author}`;
    newCardPages.innerHTML = `<strong>Pages</strong>: ${pages}`;
    newCardRead.innerHTML = `<strong>Read</strong>: ${read}`;

      // update book status
    newCardRead.addEventListener("click", () => {
        if (newCardRead.innerHTML === "<strong>Read</strong>: Yes") {
            newCardRead.innerHTML = "<strong>Read</strong>: No";
            newBook.read = "No";
            localStorage.setItem("books", JSON.stringify(libraryBooks));
        } else {
            newCardRead.innerHTML = "<strong>Read</strong>: Yes";
            newBook.read = "Yes";
            localStorage.setItem("books", JSON.stringify(libraryBooks));
        }
    });

    
     newCard.appendChild(newCardTitle);
     newCard.appendChild(newCardAuthor);
     newCard.appendChild(newCardPages);
     newCard.appendChild(newCardRead);
}

// Required in order to load saved books onto page
for(let i = 0; i < data.length; i++) {
    loadLocalStorage(data[i]);
}