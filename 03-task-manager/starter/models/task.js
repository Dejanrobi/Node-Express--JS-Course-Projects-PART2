// setting a collection model
// a model is used to perform CRUD operations on the collection

const mongoose = require('mongoose');

// setting a task schema
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide a name'],
        trim: true,
        maxlength: [20, 'name cannot be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false,
        
    }
    
})

// creating and exporting the model passing the collection name and the collection schema
module.exports = mongoose.model('tasks', TaskSchema)