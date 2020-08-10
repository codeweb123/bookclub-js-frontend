//create book object
class Book {
    constructor(bookJSON) {
        this.id = bookJSON.id
        this.title = bookJSON.title
        this.author = bookJSON.author
        this.image = bookJSON.image
        this.reviews = bookJSON.reviews
  }
  //renderbook-append to div,delete button, review button, 
    renderBook() {
        let booksContainer = document.getElementById('books-content')
        let bookBrick = document.createElement('div')
        bookBrick.className = "book-container"
        booksContainer.appendChild(bookBrick)
  
        let deleteButton = document.createElement("BUTTON")
        deleteButton.setAttribute("id", `delete-button-${this.id}`)
        deleteButton.innerHTML = "Delete Book"
        bookBrick.appendChild(deleteButton)
  
        deleteButton.addEventListener('click', () => {
        bookBrick.remove()
        this.deleteBook(`${this.id}`)
  })

        let reviewButton = document.createElement("BUTTON")
        reviewButton.setAttribute("id", `review-button-${this.id}`)
        reviewButton.setAttribute("onclick", "openForm()")
        reviewButton.innerHTML = "Add Review"
        bookBrick.appendChild(reviewButton)
  
        reviewButton.addEventListener('click', this.newReviewForm.bind(this))
  
        let image = document.createElement('img')
        image.setAttribute("class", "image")
        image.src = this.image
        bookBrick.appendChild(image)
  
        let bookInfo = document.createElement('div')
        bookInfo.className = "book-info"
        bookBrick.appendChild(bookInfo)
  
        let title = document.createElement('h3')
        title.setAttribute("class", 'book-title')
        title.innerHTML = this.title
        bookInfo.appendChild(title)
  
        let author = document.createElement('h3')
        author.setAttribute("class", 'book-author')
        author.innerHTML = `by: ${this.author}`
        bookInfo.appendChild(author)
  
        let reviewInfo = document.createElement('div')
        reviewInfo.className = "review-info"
        bookBrick.appendChild(reviewInfo)
  
        let reviewHeader = document.createElement('h4')
        reviewHeader.setAttribute("class", 'review-header')
        reviewHeader.innerHTML = 'Reviews:'
        reviewInfo.appendChild(reviewHeader)
  
        let reviews = document.createElement('div')
        reviews.setAttribute("id", `review-${this.id}`)
        reviewInfo.appendChild(reviews)
        reviews.innerHTML = this.reviews.map(review => this.reviewBody(review)).join('')
  }
  
    reviewBody(review){
        return `<p>${review.body}</p>`
  }
  
    deleteBook(id){
        return fetch('http://localhost:3000/books' + '/' + id, {
        method: 'DELETE',
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
  })
}
  
    newReviewForm(event){
        event.preventDefault();
        let newReviewForm = document.getElementById('new-review-form')   
        let submitButton = document.createElement("button") 
        submitButton.innerHTML = "Add"
        submitButton.id = "review-submit"
        submitButton.type = "submit"
        let buttonDiv = document.getElementById("buttons")
        buttonDiv.appendChild(submitButton)
        submitButton.addEventListener('click', this.submitReview.bind(this))
    }
  
    submitReview(event){
        event.preventDefault();
        let buttonDiv = document.getElementById("buttons")
        let submitButton = document.getElementById("review-submit")
        let form = document.getElementById('new-review-form')
        let newReviewBody = document.getElementById('new-review-body')
        let reviewBox = document.getElementById(`review-${this.id}`)
        let paraDiv = document.createElement('p')
        reviewBox.appendChild(paraDiv)
  
        let reviewAddition = {
          book_id: this.id ,
          body: newReviewBody.value,
    };
        fetch('http://localhost:3000/reviews', {
          method:'POST',
          headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
    },
          body:JSON.stringify(reviewAddition)
    })
          .then(res => res.json())
          .then(review => {
          paraDiv.innerHTML = review.body
          newReviewBody.value = ' '
          buttonDiv.removeChild(submitButton)
          closeForm()
    })
  }
}
