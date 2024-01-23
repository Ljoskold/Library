const showDialogBtn = document.getElementById("showDialog");
const dialog = document.getElementById("dialog");
const canclelBtn = document.getElementById("cancelBtn");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("form");
const deleteBookBtn = document.querySelectorAll(".deleteBookBtn");
const bookShelf = document.getElementById("bookShelf");
const demoBtn = document.getElementById("demoBtn");
demoBtn.addEventListener('click', (e) => {
    const currentBook = e.target.closest(".book");
    currentBook.remove();
})


showDialogBtn.addEventListener('click',() =>{
    dialog.showModal();
});

canclelBtn.addEventListener('click',(e) => {
    e.preventDefault();
    dialog.close();
});

const name = document.getElementById("name");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const readStatus = document.getElementById("readStatus");

const myLibrary = [];

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById("name");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const readStatus = document.getElementById("readStatus");

    const nameValue = name.value.trim();
    const authorValue = author.value.trim();
    const pagesValue = pages.value.trim();
    const readStatusValue = readStatus.value.trim();
    let book = new Book(nameValue, authorValue, pagesValue, readStatusValue);

    addBookToLibrary(book);
    form.reset();
    dialog.close();
    addBookToShelf(book);
})

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = generateUniqueId(name, author, pages, read); 
};

function generateUniqueId(name, author, pages) {
    return `${name}_${author}_${pages}`;
}

function addBookToLibrary (book){
    myLibrary.push(book);
}

function addBookToShelf (book){
    const bookShelf = document.querySelector(".bookShelf")
    const bookN = document.createElement("div");
    const bookName = document.createElement("h1");
    const bookAuthor = document.createElement("h2");
    const bookPages = document.createElement("h3");
    const deleteBookBtn = document.createElement("button");
    const statusSelector = document.createElement("select");
    // const option1 = document.createElement("option");
    // const option2 = document.createElement("option");

    bookN.classList.add("book");
    deleteBookBtn.classList.add("deleteBookBtn");
    bookN.appendChild(bookName);
    bookN.appendChild(bookAuthor);
    bookN.appendChild(bookPages);
    bookN.appendChild(statusSelector);
    bookShelf.appendChild(bookN);
    bookN.appendChild(deleteBookBtn);
    bookN.setAttribute("data-book-id", book.id);
    statusSelector.classList.add("bookStatus");
    
    

    bookName.innerText = book.name;
    bookAuthor.innerText = "by " + book.author;
    bookPages.innerText = "Pages: " + book.pages;
    deleteBookBtn.innerText = "Delete book";
    createOptions(statusSelector, book);

    statusSelector.addEventListener('change', function () {
        const selectedStatus = statusSelector.value;
        book.read = selectedStatus;
    });
}

bookShelf.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains("deleteBookBtn")) {
        const currentBook = e.target.closest(".book");

        if (currentBook) {
            const bookIdToDelete = currentBook.getAttribute("data-book-id");

            if (bookIdToDelete) {
                const bookIndex = myLibrary.findIndex(book => book.id === bookIdToDelete);

                if (bookIndex !== -1) {
                    myLibrary.splice(bookIndex, 1);
                    currentBook.remove();
                }
            }
        }
    }
});

function createOptions(statusSelector, book) {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");

    if (book.read === "finished") {
        option1.text = "Finished";
        option1.value = "finished";
        option2.text = "Not finished yet";
        option2.value = "not finished yet";
    } else if (book.read === "not finished yet") {
        option1.text = "Not finished yet";
        option1.value = "not finished yet";
        option2.text = "Finished";
        option2.value = "finished";
    }

    statusSelector.appendChild(option1);
    statusSelector.appendChild(option2);
}