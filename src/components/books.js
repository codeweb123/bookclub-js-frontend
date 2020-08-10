class Books {
    constructor() {
      this.books = []
      this.adapter = new BooksAdapter()
      this.initBindingsAndEventListeners()
      this.fetchAndLoadBooks()
    }
  
    initBindingsAndEventListeners() {
      this.newBookForm = document.getElementById('new-book-form')
      this.newBookTitle = document.getElementById('new-book-title')
      this.newBookAuthor = document.getElementById('new-book-author')
      this.newBookImage = document.getElementById('new-book-image')
      this.newBookForm.addEventListener('submit', this.createBook.bind(this))
    }
  
    createBook(event) {
      event.preventDefault(); //prevents the default of page refresh on form submit
      let titleValue = this.newBookTitle.value;
      let authorValue = this.newBookAuthor.value
      let imageValue = this.newBookImage.value
  
    this.adapter.createBook(titleValue,authorValue,imageValue)
      .then(book => {
      let newBook = new Book(book)
      this.books.push(newBook)
      this.newBookTitle.value = ' '
      this.newBookAuthor.value = ' '
      this.newBookImage.value = ' '
      newBook.renderBook()
    })
  }
  
    fetchAndLoadBooks() {
      this.adapter
        .getBooks()
        .then(books => {
        books.forEach(book => this.books.push(new Book(book)))
        })
        .then(() => {
        this.renderBooks()
    })
  }
  
    renderBooks() {
      this.books.map(book => book.renderBook())
    }
  }