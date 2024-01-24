// importing mongoose
const mongoose = require('mongoose')


const connectDB =(url)=>{
    // connection method (passing the connection string)
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }) 
}


// exporting the connectDB function
module.exports = connectDB



