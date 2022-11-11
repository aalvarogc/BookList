import { Book, BookList } from "./book.js";

window.onload = ()=>{
    let booklist = new BookList();

    let submit = document.getElementById("submit");
    submit.addEventListener("click", function(event){
        event.preventDefault()
      });

    submit.addEventListener("click", () =>{
        let titulo = document.getElementById("titulo");
        let autor = document.getElementById("autor");
        let genero = document.getElementById("genero");

        if(titulo.value == "" ||autor.value == "" ||genero.value == ""){
            alert("Introduce los campos del libro.")
        }else{
            booklist.addBook(new Book(titulo.value, autor.value, genero.value));
            titulo.value = "";
            autor.value = "";
            genero.value = "";
        }

        pintarListaLibros(booklist);
    });

    document.getElementById("readingList").addEventListener("click", () =>{     
        booklist.finishCurrentBook();
        pintarListaLibros(booklist);
    }); 

    function pintarListaLibros(lista){
        document.getElementById("readingList").innerHTML = "";
        lista.books.forEach(libro =>{
                let leido;

                if (!libro.read)
                    leido="Not Read";
                else{
                    const d = new Date();
                    let date = d.toLocaleDateString();
                    leido = "Read on " + date;
                }

            //Añadir Libro en interfaz
            let bookEntry = `<li class="libroLista"><div>
            <h4 class="my-0"><b>${libro.title}</b></h4> <small class="text-muted">${libro.author}</small>
            </div> <span class="text-muted">${leido}</span>
            </li>`;
            
                
            document.getElementById("readingList").innerHTML += bookEntry;
            
        })

        document.getElementById("booksRead").innerHTML = lista.nBooksReaded + " of "+ lista.getTotalBooks();
    }
}