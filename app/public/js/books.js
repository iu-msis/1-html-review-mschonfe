const booksApp = {
    data() {
      return {
          result:undefined,
          app:0,
          books: [],
          bookForm:{},
          selectedBook: null
      }
    },
    methods: {
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        fetchBookData() {
            fetch('api/books/')
            .then(response => response.json())
            .then((parsedJson) => {
                console.log(parsedJson);
                this.books = parsedJson;
                console.log("C");
            })
            .catch( (error) => {
                console.error(error);
            })
            console.log("B");
        },
        postNewBook(evt) { //event handler for form submission, event object is the default 
            //select the student id and add another offer into this student     
            console.log("Posting:", this.bookForm);
            alert("Posting!");
    
            fetch('api/books/create.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                this.bookForm = {};

                this.handleResetEdit();
            });
        }
        postBook(evt) {
            if (this.selectedBook === null) {
                this.postNewBook(evt);
            } else {
                this.postEditBook(evt);
            }
          },
          postNewBook(evt) {
            this.bookForm.studentId = this.selectedStudent.id;
    
            console.log("Creating!", this.bookForm);
    
            fetch('api/book/create.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.book = json;
    
                // reset the form
                this.resetBookForm();
              })
              .catch( err => {
                alert("Something went horribly wrong!");
              });
          },
          postEditBook(evt) {
            // this.bookForm.studentId = this.selectedStudent.id;
            this.bookForm.id = this.selectedBook.id;
    
            console.log("Updating!", this.offerForm);
    
            fetch('api/book/update.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                this.books = json;
  
                // reset the form
                this.handleResetEdit();
              });
  
          },
          postBook(evt) {
            console.log ("Test:", this.selectedBook);
          if (this.selectedBook) {
              this.postEditBook(evt);
          } else {
              this.postNewBook(evt);
          }
        },
          postDeleteBook(book) {
            if ( !confirm("Are you sure you want to delete this:  "  + "?") ) {
                return;
            }
            console.log("Delete!", book);
  
            fetch('api/books/delete.php', {
              method:'POST',
              body: JSON.stringify(book),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.books = json;
  
              // reset the form
              this.handleResetEdit();
            });
        },

        handleEditBook(book) {
            this.selectedBook = book;
            this.bookForm = Object.assign({}, this.selectedBook);
        },
        handleResetEdit() {
            this.selectedBook = null;
            this.bookForm = {};
        }


    },
    created() {
        this.fetchBookData();
    }
    
}

  
Vue.createApp(bookApp).mount('#booksApp');