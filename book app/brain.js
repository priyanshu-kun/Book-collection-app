


// Create a Book class: That representation of Books
class Book {
    constructor(title, author, ISBN) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
    }
}




// UI class : It handle userinterface tasks
class UI {
    static DisplayBooks() {
        let books = SetLocalStorage.getBooks();
        books.forEach(book => UI.addBookInList(book));
    }

    static addBookInList(book) {
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");
        row.setAttribute("class", "data-row")

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.ISBN}</td>
            <td><i class="fas fa-trash delete"></i></td>
        `
        list.appendChild(row);
    }

    static ShowAlertMessage(message, Alertclass) {
        let div = document.createElement("div");
        div.className = `alert alert-${Alertclass}`;
        div.appendChild(document.createTextNode(message));
        div.style.textAlign = "center";
        div.style.padding = "2rem 0";
        let targetElement = document.querySelector(".form");
        targetElement.insertAdjacentElement("beforebegin", div);

        // vanish to the DOM
        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 2000);
    }

    static deleteBook(targetDeleteBook) {
        if (targetDeleteBook.classList.contains("delete")) {
            targetDeleteBook.parentElement.parentElement.remove();
        }
    }

    static clearfields() {
        document.querySelector("#book-name").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#ISBN").value = "";
    }


}



// Storage class: handle local storage
class SetLocalStorage {

    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }


    static addLocalbooks(InputBook) {
        const books = SetLocalStorage.getBooks();
        books.push(InputBook);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static deleteLocalbooks(isbn) {
        const books = SetLocalStorage.getBooks();
        books.forEach(function (item, index) {
            if (item.ISBN === isbn) {

                books.splice(index, 1);

            }
        })
        localStorage.setItem("books", JSON.stringify(books));
    }

}




// Event: Display book

document.addEventListener("DOMContentLoaded", UI.DisplayBooks);

// Event: add a book
document.querySelector("#Book-form").addEventListener("submit", e => {
    e.preventDefault();
    let Book_Title = document.querySelector("#book-name").value;
    let Author_Name = document.querySelector("#author").value;
    let ISBN_Number = document.querySelector("#ISBN").value;

    if (Book_Title === "" || Author_Name === "" || ISBN_Number === "") {
        UI.ShowAlertMessage("Please Enter Some Data In Input Fields...", "danger");
    }
    else {
        // create instant of the class aka process called instatiation
        let book = new Book(Book_Title, Author_Name, ISBN_Number);

        // Add book to UI
        UI.addBookInList(book);


        // Add book in local storage
        SetLocalStorage.addLocalbooks(book);

        // show success message
        UI.ShowAlertMessage("Book added successfully!", "success");

        // clear input fields
        UI.clearfields();
    }



})



// Event: remove book
document.querySelector("#book-list").addEventListener("click", e => {
    // console.log(e.target)
    UI.deleteBook(e.target);

    // Delete from local storage
    SetLocalStorage.deleteLocalbooks(e.target.parentElement.previousElementSibling.textContent);

    if (e.target.classList.contains("delete")) {
        // show success to book removed
        UI.ShowAlertMessage("Book removed successfully!", "success");
    }

})


//create hide and unhide logic and I will Use some Jquery in it.
$("thead").on("click", (e) => {

    if (e.target.classList.contains("hide-show")) {
        if ($("#drop-down-body abbr i").hasClass("drop-down")) {
            $("#drop-down-body").html(`<abbr title="Hide/Unhide Book list"><i class="fas fa-chevron-up hide-show drop-up"></i></abbr>`);
            $("#book-list").fadeOut(500);
        }
        else {
            $("#drop-down-body").html(`<abbr title="Hide/Unhide Book list"><i class="fas fa-chevron-down hide-show drop-down"></i></abbr>`);
            $("#book-list").fadeIn(500);
        }
    }
})
