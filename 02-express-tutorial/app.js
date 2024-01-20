// getting the express module
const express = require('express');

// invoking the module
const app = express();


// importing the people router
const peopleRouter = require('./routes/people')

// importing the login router
const loginRouter = require('./routes/auth')



// passing the path of our static files to be served whenever requested on the browser
app.use(express.static('./methods-public'))

// parsing formData to the req body object using express middleware function
// extended should be set to false because its default is true
// this middleware parses any incoming form data to the request body object
app.use(express.urlencoded({ extended:false }))

// parsing any incoming json data to the request body
app.use(express.json())

// setting the peopleRouter app.use
app.use('/api/people', peopleRouter)

// setting the loginRouter app.use
app.use('/login', loginRouter)








// listening to the port
app.listen(5000, ()=>{
    console.log("Server listening to port 5000.....")
})