// setting the router
const express = require('express')
const router = express.Router()

// importing the controller functions
const { getAllTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/tasks')

// setting the router paths and their respective controller functions.

// if the routes are the same, we set the requests on the same line
router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)



// exporting the routers
module.exports = router
