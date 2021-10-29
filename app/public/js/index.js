const profile = {
    data() {
    return {
        person: [],
        books : [],
        selectedBook : null,
        bookForm : {}
    }
},

    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date)
            .format('D MMM YYYY');
        }
    },
    methods: {
        fetchUserData() {
            fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then((parsedJson) => {
                console.log(parsedJson);
                this.person = parsedJson.results[0]
               
            })
            .catch( err => {
                console.error(err)
            })

            
        },
       
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        selectBook(b) {
            if (b == this.selectedBook) {
                return;
            }
            this.selectedBook = b;
            this.books = [];
            this.fetchBooksData(this.selectedBook);
        },
        fetchBooksData() {
            fetch('/api/books/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        postEditBook(evt) {
            this.bookForm.id = this.selectedBook.id;
            this.Form.book_id = this.selectedBook.id;        
            
            console.log("Editing!", this.bookForm);
    
            fetch('api/books/update.php', {
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
                
                // reset the form
                this.handleResetEdit();
              });
          },
    


        postNewBook(evt) {
  
            console.log("Posting!", this.bookForm);
            fetch('api/books/create.php',
            {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                    "Content-Type" : "application/json: charset=utf-8"
                }
              })
               

              .then( response => response.json() )
              .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;
                
                // reset the form
                this.bookForm = {};
          });
      
  },
  postDeleteBook(o) {  
    if ( !confirm("Are you sure you want to delete " + o.title + "?") ) {
        return;
    }  
    
    console.log("Delete!", o);

    fetch('api/books/delete.php', {
        method:'POST',
        body: JSON.stringify(o),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then( response => response.json() )
      .then( json => {
        console.log("Returned from post:", json);
        // TODO: test a result was returned!
        this.offers = json;
        
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
        this.fetchBooksData();
        this.fetchUserData();
    }
  }
  
Vue.createApp(profile).mount('#ProfileApp');