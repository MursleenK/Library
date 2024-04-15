let count=0;
const myLibrary = [{
  name:"The Pragmatic Programmer",
  author: "Andy Hunt",
  pages: 321,
  status: "Unread",
},];

function Book(name, author, pages, status) {
  this.name=name;
  this.author=author;
  this.pages=pages;
  this.status=status;
}

function addBookToArray() {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const status = document.getElementById("status");
  const button = document.getElementById("button");

  //I am using a single checkbox to control the read/unread status of the book. The code below does that. 
  status.addEventListener("input", ()=>{
    if(status.value==="Unread") {
    status.value="Read";
  } else{status.value="Unread"}
  })

  //This adds the book to the array myLibrary.
  button.addEventListener("click", (event)=> {
    myLibrary.push(
      new Book(`${title.value}`, `${author.value}`, `${pages.value}`, `${status.value}`)
    )

    //I didn't use the dialog box; curiously, if I wrapped my form in <dialog></dialog>, I wouldn't need event.preventDefault();
    event.preventDefault();
    //To add the newbook added though the form to the library. 
    addBookToLibrary()
  })
}

function addBookToLibrary() {
  //instead of somehow telling my code to ignore the books already in the library, I am telling it to start at the last book in myLibrary. 
  for (let i=myLibrary.length-1; i<myLibrary.length; i++) {

    //To endure that empty inputs don't get added to the library.
    if (`${myLibrary[i].name}`!=="" && `${myLibrary[i].author}`!=="") {
    let library=document.querySelector(".library");
    let child=document.createElement("div");
    child.classList.add(`class${count}`)
    child.style.cssText=`
    border-bottom: solid 1px black;
    width: 100%;
    height: 50px;

    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 2fr repeat(4, 1fr);
    justify-items: center;
    align-items: center;
    `
    library.appendChild(child);

    let defaultBook=document.querySelector(`.class${count}`);
    let bookTitle=document.createElement("div");
    let bookAuthor=document.createElement("div");
    let bookPages=document.createElement("div");
    let bookStatus=document.createElement("button");
    let bookRemove=document.createElement("button");


    bookTitle.textContent = `${myLibrary[i].name}`;  
    bookAuthor.textContent = `${myLibrary[i].author}`;  
    bookPages.textContent = `${myLibrary[i].pages}`;  
    bookStatus.textContent = `${myLibrary[i].status}`;  
    bookRemove.textContent = `❌`; 

    //To delete book
    bookRemove.addEventListener("click", ()=>{
      library.removeChild(child);

    })

    //To change the read/unread status in the library.
    bookStatus.addEventListener("click",()=>{
      if (bookStatus.textContent==="Unread") {
        bookStatus.textContent = "Read"
      } else {bookStatus.textContent = "Unread"}
    })
    
    defaultBook.appendChild(bookTitle);
    defaultBook.appendChild(bookAuthor);
    defaultBook.appendChild(bookPages);
    defaultBook.appendChild(bookStatus);
    defaultBook.appendChild(bookRemove);
    }
  }
  count++;
}
addBookToArray();
addBookToLibrary();
