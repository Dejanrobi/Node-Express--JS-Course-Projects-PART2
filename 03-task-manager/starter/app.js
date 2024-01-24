
// importing  modules
const express = require('express')
const app = express();
const tasksRouter = require('./routes/tasks')
const connectDB = require('./db/connect')
// functions in that package are automatically executed
require('dotenv').config()
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')


// middleware
// serving all static files
app.use(express.static('./public'))

// patching all json content to the request body
app.use(express.json())


// routes

// applying the tasksRouter using a middleware and setting a base path
app.use('/api/v1/tasks', tasksRouter)

app.use(notFound)

app.use(errorHandlerMiddleware)


// setting the port variable
const port = 3000

// starting the server once we connect to the database
// the connectDB function returns a response
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        // after success we start the server

        // listening to port 3000 with the server
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}...`)
        })        
    } catch (error) {
        console.log(error)       
    }

}

// invoking the start function
start()

