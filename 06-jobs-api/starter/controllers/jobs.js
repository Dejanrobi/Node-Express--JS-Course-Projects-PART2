// imports
const JobModel = require('../models/Job');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors/index')

// get all jobs controller
const getAllJobs = async (req, res)=>{
    // get the jobs associated with the current user
    const jobs = await JobModel.find({createdBy:req.user.userId}).sort()
    res.status(StatusCodes.OK).json({jobs, count:jobs.length})
}

// get a single job
const getJob = async (req, res)=>{
    // we will destructure the req, obtain the user and params from the req
    // from the user, we will obtain userId and from params, we will obtain id then set it to jobId
    // params are e.g. req.params obtained from the url where there is an extension of: /:id . so id is the property and the value is the one 
    // entered when a request is made
    const{user:{userId}, params:{id:jobId} } = req

    // finding the job, we will check for both userId and jobId
    const job = await JobModel.findOne({_id:jobId, createdBy:userId})

    // throw error if no job
    if(!job){
        throw new NotFoundError(`No job with id:${jobId}`)
    }

    // responding with  the actual job
    res.status(StatusCodes.OK).json({ job })
}

// Create a job
const createJob = async (req, res)=>{
    // associating job with user Id
    req.body.createdBy = req.user.userId
    // create a job
    const job = await JobModel.create(req.body)
    // response
    res.status(StatusCodes.CREATED).json({job})
}

// Update a job
const updateJob = async (req, res)=>{
    const{
        body: {company, position},
        user: {userId}, 
        params: {id:jobId} 
    } = req

    // checking if company or position is empty
    if(company==='' || position===''){
        throw new BadRequestError('Company or Position fields cannot be empty')
    }

    // finding the job and updating it 
    const job = await JobModel.findByIdAndUpdate({_id:jobId, createdBy:userId}, req.body, {new:true, 
    runValidators:true})

    // if job is not found, throw an error
    if(!job){
        throw new NotFoundError(`No job with id:${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})
}

// Delete a job
const deleteJob = async (req, res)=>{
    // accessing the required details
    const{
        user: {userId}, 
        params: {id:jobId} 
    } = req

    // deleting the job
    const job = await JobModel.findByIdAndRemove({
        _id:jobId,
        createdBy:userId
    })
    
    // if job is not found, throw an error
    if(!job){
        throw new NotFoundError(`No job with id:${jobId}`)
    }

    res.status(StatusCodes.OK).send("Job Delete Successfully")
}


// exporting the job controllers
module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}

