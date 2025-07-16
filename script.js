let myLibrary = [];

const bookContainer = document.querySelector(".book-container");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  readStatusToggle() {
    this.read = this.read === "yes" ? "no" : "yes";
  }
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, pages, read);

  myLibrary.push(book);

  function displayBook(array) {
    bookContainer.innerHTML = "";

    array.forEach((item, index) => {
      const book = document.createElement("div");
      book.setAttribute("class", "book");
      book.style.backgroundColor = `hsl(${Math.floor(
        Math.random() * 256
      )}, 100%, 90%)`;

      for (const key in item) {
        const info = document.createElement("div");
        info.textContent = item[key];
        book.appendChild(info);
      }

      const readStatusUpdate = document.createElement("button");
      readStatusUpdate.textContent =
        item.read === "yes" ? "Mark as Unread" : "Mark as Read";

      readStatusUpdate.addEventListener("click", () => {
        item.readStatusToggle();
        displayBook(myLibrary);
      });

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";

      removeBtn.addEventListener("click", () => {
        myLibrary.splice(index, 1);
        displayBook(myLibrary);
      });

      book.appendChild(readStatusUpdate);
      book.appendChild(removeBtn);
      bookContainer.appendChild(book);
    });
  }
  displayBook(myLibrary);
}

const dialogBox = document.querySelector("dialog");
const dialogOpener = document.querySelector(".dialog-opener");
const submitBtn = document.querySelector("#submit-button");

const form = document.querySelector("form");
const closeBtn = document.querySelector(".close")
const bookInp = document.querySelector("#book-input");
const authorInp = document.querySelector("#author-input");
const pageInp = document.querySelector("#no-of-pages");
const readInp = document.querySelector("#read-input");

dialogOpener.addEventListener("click", () => {
  dialogBox.showModal();
});

bookInp.addEventListener("input", () => {
  if (bookInp.validity.valueMissing) {
    bookInp.setCustomValidity("Please Enter the Book Name");
  } else {
    bookInp.setCustomValidity("");
  }
});

authorInp.addEventListener("input", () => {
  if (authorInp.validity.valueMissing) {
    authorInp.setCustomValidity("Please Enter the Author Name");
  } else {
    authorInp.setCustomValidity("");
  }
});

pageInp.addEventListener("input", () => {
  if (pageInp.validity.valueMissing) {
    pageInp.setCustomValidity("Please enter a Valid Page count");
  } else if (pageInp.validity.rangeOverflow) {
    pageInp.setCustomValidity(`Please enter number smaller than ${pageInp.max}
    Currently it's ${pageInp.value}`);
  } else if (pageInp.validity.rangeUnderflow) {
    pageInp.setCustomValidity(`Please enter number greater than ${pageInp.min}
    Currently it's ${pageInp.value}`);
  } else {
    pageInp.setCustomValidity("");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  readInp.value = readInp.checked ? "yes" : "no";

  const bookInfo = bookInp.value;
  const authorInfo = authorInp.value;
  const pageInfo = pageInp.value;
  const readInfo = readInp.value;

  bookInp.value = "";
  authorInp.value = "";
  pageInp.value = "";

  addBookToLibrary(bookInfo, authorInfo, pageInfo, readInfo);

  dialogBox.close();
});


closeBtn.addEventListener("click", (e)=> {
  e.preventDefault()
  dialogBox.close()
})


addBookToLibrary(
  "Book 1",
  "Author 1",
  `${Math.floor(Math.random() * 100)}`,
  "yes"
);
addBookToLibrary(
  "Book 2",
  "Author 2",
  `${Math.floor(Math.random() * 100)}`,
  "no"
);
