// Task model
const TaskModel = require('../models/task')

// importing the async wrapper
const asyncWrapper = require('../middleware/async')

// getAllTasks function
const getAllTasks = asyncWrapper( async (req, res)=>{ 
    // an empty object is passed to obtain all the documents in the collection
    const tasks = await TaskModel.find({})
    res.status(200).json({ tasks })      
    // res.status(200).json({ status:"success", tasks, amount:tasks.length })          
})

// creating a task document
const createTask = asyncWrapper( async (req, res)=>{
    // creating a task in the database, we pass the req.body which contains the items in a task
    const task = await TaskModel.create(req.body)
    // after task is created successfully
    res.status(201).json({ task })   
})

// get a single task
const getTask = asyncWrapper( async (req, res)=>{
    // the below states that, grab be an id from the following object and assign it to a variable taskID
    const { id:taskID } = req.params
    // finding the single task 
    // find a task whose id matches the taskID
    const task = await TaskModel.findOne({_id:taskID})
    
    // checking if a task is found
    if(task){
        return res.status(200).json({ task })
    }else{
        return res.status(404).json({msg: `No task with id: ${taskID}`})
    }
})

// updating a task
const updateTask = asyncWrapper( async (req, res)=>{

    const {id:taskID} = req.params

    // updating the task by sending the id and the data to update
    // set new to true and runValidators to true because the validators that were set in the schema are not automatically run here
    const task = await TaskModel.findOneAndUpdate({_id:taskID}, req.body, {
        new:true,
        runValidators: true           
    })

    if(task){
        return res.status(200).json({task})
    }else{
        return res.status(404).json({msg: `No task with id: ${taskID}`})
    }
 
})


// delete a single task
const deleteTask = asyncWrapper( async (req, res)=>{
    const { id:taskID } = req.params
    const task = await TaskModel.findOneAndDelete({_id:taskID});

    if(task){
        return res.status(200).json({task})
    }else{
        return res.status(404).json({msg: `No task with id: ${taskID}`})
    }
})



// exporting the functions
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}