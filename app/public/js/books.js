const SomeApp = {
    data() {
      return {
          result:undefined,
          app:0,
          books: [],
          bookForm:{}
      }
    },
    computed: {
        prettyBirthday() {
            return dayjs(this.result.dob.date)
            .format('D MMM YYYY')
        }
    },
    methods: {
        fetchBookData() {
            //Method 1:
            fetch('/api/student/')
            .then(response => response.json())
            .then((json) => {
                console.log("Got json back:", json);
                this.books = json;
            })
            .catch( (error) => {
                console.error(error);
            })
        },
        postNewBook(evt) {

            fetch('/api/books/create.php', {
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
    },
    created() {
        this.fetchBookData();
    }


  }
  
  Vue.createApp(SomeApp).mount('#someApp');

 // https://github.com/tag/msis-in-class-2021/blob/blue-2021/public/js/index.js