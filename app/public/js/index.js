//his code is taken from in class exercises
const profile = {
    data() {
    return {
        "person": undefined,
        "books" : undefined
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
        fetchBooksData(s) {
            console.log("Fetching books for", b);
            fetch('/api/books/?book=' + b.id)
            .then(response => response.json())
            .then((parsedJson) => {
                console.log(parsedJson);
                this.offers = parsedJson
            })
            .catch( err => {
                console.error(err)
            })
        
    },

        
    },
    
    created() {
        this.fetchBooksData();
    }
  }
  
Vue.createApp(profile).mount('#ProfileApp');