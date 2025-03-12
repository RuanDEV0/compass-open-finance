function CreateBook(title, author, pages, capters){
    this.bookTitle = title;
    this.bookAuthor = author; 
    this.bookPages = pages;
    this.bookCapters = capters;
}

const book1 =  new CreateBook(
    "33 estratégias de guerra: Aprenda com as batalhas da história ...",
    " Robert Greene e Talita M. Rodrigues",
    560,
    {
        chap1: "Guerra Autodirigida",
        chap2: "Guerra Organizacional",
        chap3: "Guerra Defensiva"
    }
)

book1.color = "white";

console.log(book1);

console.log(Math.max(12,34,4,32,1,54,2,1,23,10));

let firstName = "Ruan";

console.log(`Hey, my name is ${firstName}`);