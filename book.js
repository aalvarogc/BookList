// READING LIST
class BookList{
    constructor(){
        this.nBooksReaded = 0
        this.nBooksNotReaded = 0
        this.nextBook = null
        this.currentBook = null
        this.lastBook = null
        this.books = []
    }

    addBook(book){
        if(!(book instanceof Book))
            throw Error("Tienes que añadir un objeto Book")
        this.books.forEach(book_in_list =>{
            if(book_in_list.title === book.title)
                throw Error ("Ya has añadido ese libro.")
        })
        if(this.books.length == 0){
            this.currentBook = book
        }
        this.books.push(book)
        this.nBooksNotReaded = this.getBooksNotReaded(this.books)
        this.nextBook = this.getNextBookToRead()
    }

    getBooksNotReaded(){
        let count = 0
        this.books.forEach(book => {
            if(book.read == false){
                count++
            }
        });
        return count
    }


    getNextBookToRead(){
        for(let i=0; i<this.books.length; i++){
            if(this.books[i].read === false && this.books[i] != this.currentBook){
                return this.books[i]
            }
        }
    }

    finishCurrentBook(){
        if(!this.currentBook){
            throw Error("No hay ningún libro actual para terminar")
        }
        this.currentBook.read = true
        this.currentBook.setNowDate()
        this.nBooksReaded++
        this.nBooksNotReaded--
        this.lastBook = this.currentBook
        this.currentBook = this.getNextBookToRead(this.books)
        this.nextBook = this.getNextBookToRead()
    }

    getBooks(books){
        return this.books
    }

    getTotalBooks(){
        return this.books.length;
    }
}

class Book{
    constructor(title, genre, author){
        this.title = title
        this.genre = genre
        this.author = author
        this.read = false
        this.readDate = null
    }

    setNowDate(){
        this.readDate = Date(Date.now())
    }
}

export { BookList, Book };