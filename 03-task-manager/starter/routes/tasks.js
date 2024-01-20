// setting the router
const express = require('express')
const router = express.Router()

// importing the controller functions
const { getAllTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/tasks')

// setting the router paths and their respective methods
// access the controller functions

// app.get('/api/v1/tasks')          - get all the tasks
// app.post('/api/v1/tasks')         - create a new task
// app.get('/api/v1/tasks/:id')      - get single task
// app.patch('/api/v1/tasks/:id')    - update task
// app.delete('/api/v1/tasks/:id')   - delete task

// if the routes are the same, we set the requests on the same line
router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)



// exporting the routers
module.exports = router
