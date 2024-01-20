// creating the router
const express = require('express');
const router = express.Router()

// importing the jobs controller functions 
const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require("../controllers/jobs")

// setting the routes
router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

// export the router
module.exports = router