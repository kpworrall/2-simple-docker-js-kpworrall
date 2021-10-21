const profile = {
    data() {
    return {
        "person": [],
        "books" : [],
        "selectedBook" : [],
        "bookForm" : []
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

        
    


        postNewBook(evt) {
  
            console.log("Posting!", this.bookForm);
            fetch('/api/books/create.php',
            {
                method:'POST',
                body: JSON.stringify(this.bookForm)
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
        this.fetchBooksData();
    }
  }
  
Vue.createApp(profile).mount('#ProfileApp');