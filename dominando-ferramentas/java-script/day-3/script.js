function createBook(title, author, pages, capters){
    let book = {
        bookTitle: title,
        bookAuthor: author,
        bookPages: pages,
        bookCapters: capters,
        printBook: function(){
            console.log("printing.....")
        }
    }
    return book;
}

const book1 = createBook(
    "33 estratégias de guerra: Aprenda com as batalhas da história ...",
    " Robert Greene e Talita M. Rodrigues",
    560,
    {
        chap1: "Guerra Autodirigida",
        chap2: "Guerra Organizacional",
        chap3: "Guerra Defensiva"
    }
)

console.log(book1)

