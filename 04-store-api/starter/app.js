require("dotenv").config()

// a package to handle async errors
require('express-async-errors')


// creating the server using express
const express = require('express');
const app = express();

//import  connectDB function
const connectDB = require('./db/connect')

// import products router
const productsRouter = require('./routes/products')

//Importing Middlewares

// not found
const notFoundMiddleware = require('./middleware/not-found')
// error handler
const errorHandlerMiddleware = require('./middleware/error-handler')

// Setting Middlewares to patch any passed json data to the request body
app.use(express.json())


// ROUTES

// testing
// home route
app.get('/', (req, res)=>{
    res.send("<h1>Store API</h1> <a href='/api/v1/products'>products route</a>")

})

// products router middleware
// set the base url and the router
app.use('/api/v1/products', productsRouter)

// error routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)


// a function to start the server

// setting the port
const port = process.env.PORT || 3000;

const start = async()=>{
    try {
        // connectDB
        await connectDB(process.env.MONGO_URI)

        // listening to the port
        app.listen(port, ()=>{
            console.log(`Server is listening to port ${port}...`)
        })        
    } catch (error) {
        console.log(error)
    }
}

// invoking the start function
start()