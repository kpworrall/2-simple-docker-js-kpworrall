//his code is taken from in class exercises
const profile = {
    data() {
    return {
        "person": [],
        "books" : []
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

        
    },
    
    created() {
        this.fetchBooksData();
    }
  }
  
Vue.createApp(profile).mount('#ProfileApp');