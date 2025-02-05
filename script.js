let myLibrary = [];

const bookContainer = document.querySelector(".book-container")

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, pages, read);

  myLibrary.push(book)


  function displayBook(array) {
    bookContainer.innerHTML = "";

    array.forEach((item,index) => {
      const book = document.createElement("div")
      book.setAttribute("class", "book")

      for (const key in item) {
        const info = document.createElement("p")
        book.appendChild(info)
        info.textContent = item[key]
      }
      
      const removeBtn = document.createElement("button")
      removeBtn.textContent = 'remove';
      
      removeBtn.addEventListener("click", ()=>{
        myLibrary.splice(index, 1)
        displayBook(myLibrary)
      })
      
      book.appendChild(removeBtn);
      bookContainer.appendChild(book)
    });
  }
  displayBook(myLibrary)
}


const dialogBox = document.querySelector("dialog")
const dialogOpener = document.querySelector(".dialog-opener")
const submitBtn = document.querySelector("#submit-button")

const bookInp = document.querySelector("#book-input")
const authorInp = document.querySelector("#author-input")
const pageInp = document.querySelector("#no-of-pages")
const readInp = document.querySelector("#read-input")


dialogOpener.addEventListener("click", () => {
  dialogBox.showModal()
})

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (!bookInp.value || !authorInp.value || !pageInp.value) {
    alert("Please fill out!");
    return;
  }

  readInp.value = readInp.checked ? "Yes" : "No"

  const bookInfo = bookInp.value;
  const authorInfo = authorInp.value;
  const pageInfo = pageInp.value;
  const readInfo = readInp.value;

  bookInp.value = "";
  authorInp.value = "";
  pageInp.value = "";

  addBookToLibrary(bookInfo, authorInfo, pageInfo, readInfo)

  dialogBox.close();
})