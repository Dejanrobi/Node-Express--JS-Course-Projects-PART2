require('dotenv').config()

// import connectDB function
const connectDB = require('./db/connect');

// import the product Model
const ProductModel =  require('./models/product')

// import products.json file
const jsonProducts = require('./products.json');

// function to connect to the database
const start = async ()=>{
    try {
        // connect to database
        await connectDB(process.env.MONGO_URI)
        // delete all products present in the collection
        await ProductModel.deleteMany()
        // creating the products by passing json products
        await ProductModel.create(jsonProducts)
        console.log("Success!!!!")
        
        // terminating the process
        // if 0 is passed, then everything went on properly
        process.exit(0)
        
    } catch (error) {
        console.log(error)
        // if 1 is passed, then an error occurred
        process.exit(1)
        
    }

}

start()