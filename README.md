# TOP-Library
 
<img src="https://img.shields.io/github/last-commit/Risclover/TOP-Library?color=blue&style=flat-square"><img src="">

Badges to add in the future:
* Release date
* Last updated date
* Maybe version number?
* Maintenance badge? (Whether it's maintained as well as last maintained)

## Introduction
([Back to Top](#top-library))
### Table of Contents
  - [Introduction](#introduction)
    - [Table of Contents](#table-of-contents)
    - [Updates](#updates)
  - [About Project](#about-project)
    - [Original Project Instructions](#original-project-instructions)
    - [Technologies Used](#technologies-used)
- [How to Use](#how-to-use)
- [Links](#links)

### Updates
* **03/03/2022** - Rewrote the JavaScript code into jQuery. Please read my Project Breakdown for more information about this (why I did it as well as a comparison)

## About Project 
([Back to Top](#top-library))

This "library" is a project given by [The Odin Project](https:/www.theodinrpoject.org/)'s JavaScript course (found within both of the advanced paths after Foundations). It follows a lesson on [objects and object constructors](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/objects-and-object-constructors), and their instructions are as follows:

### Original Project Instructions

1. If you haven’t already, set up your project with skeleton HTML/CSS and JS files.

2. All of your book objects are going to be stored in a simple array, so add a function to the script (not the constructor) that can take user’s input and store the new book objects into an array. Your code should look something like this:

    ```h
    let myLibrary = [];

    function Book() {
    // the constructor...
    }

    function addBookToLibrary() {
    // do stuff here
    }
    ```
3. Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own “card”. It might help for now to manually add a few books to your array so you can see the display.*

4. Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book: author, title, number of pages, whether it’s been read and anything else you might want.

5. Add a button on each book’s display to remove the book from the library.
   - You will need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array.
6. Add a button on each book’s display to change its read status.
   - To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.

If you visit their page for that project, you can find plenty of finished examples of this project at the bottom.

### Technologies Used

During the creation of this project, I used the following languages, frameworks, and tools:

* HTML
* CSS
* JavaScript
* Visual Studio Code


## How to Use
([Back to Top](#top-library))

Click on the "New Book" button to add a book to the library.

(image of button)

Clicking this button brings up a popup window. Fill in the book's title, author, number of pages, and whether or not you've already read this book.

(image of popup window with things filled in)

When done, click Submit. Please note that attempting to leave a field blank yields an error.

(image of error)

Once you click the Submit button, the popup window will close, and your book should now be displayed on the page in a card.

(image of card)

You can edit whether or not you've read the book. You can also click the X in the upper right-hand corner to delete the book from your collection.

(image of X circled in red, or of a red arrow pointing to it)

## Links
([Back to Top](#top-library))
1. [Live Demo](https://risclover.github.io/TOP-Library)
2. [Code Repo](https://www.github.com/Risclover/TOP-Library) (You are here)
3. [Blog Post -> "Project Breakdown: Library"](https://risclover.github.io/official-portfolio/)
