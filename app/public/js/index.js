//his code is taken from in class exercises
const profile = {
    data() {
    return {
        "person": [],
        "selectedBook" : null,
        "books" : [],
        "bookForm" : {},
    }
},

    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date)
            .format('D MMM YYYY');
        }
    },
    methods: {
       
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        selectBook(b) {
            if (b == this.selectedBook) {
                return;
            }
            this.selectedBook = s;
            this.books = [];
            this.fetchBookData(this.selectedBook);
        },

        fetchBookData() {
            fetch('/api/books/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.students = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        postNewBook(evt) {
          this.bookForm.book_id = this.selectedBook.id;        
          
          console.log("Posting!", this.bookForm);
  
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
              
              // reset the form
              this.bookForm = {};
            });
        }

    },
    
    created() {
        this.fetchBookData();
    }
  }
  
Vue.createApp(profile).mount('#ProfileApp');