//his code is taken from in class exercises
const profile = {
    data() {
    return {
        "person": undefined,
        "book" : undefined
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
        fetchBookData() {
          
            fetch('/api/book/?book_id=' + b.id)
            .then( response => response.json() )
            .then( (responseJson) => {
                
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });

        }
    },
    
    created() {
        this.fetchUserData();
    }
  }
  
Vue.createApp(profile).mount('#ProfileApp');