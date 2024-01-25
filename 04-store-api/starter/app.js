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
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// Setting Middlewares to patch any passed json data to the request body
app.use(express.json())


// ROUTES
// products router middleware
// set the base url and the router
app.use('/api/v1/products', productsRouter)

// error routes
app.use(notFoundMiddleware); //displays not found when the endpoint requested does not exist in the above routes
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