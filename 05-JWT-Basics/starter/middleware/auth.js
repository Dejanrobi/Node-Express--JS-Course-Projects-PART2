// importing JWT
const jwt = require('jsonwebtoken')
// importing the API error
const CustomAPIError = require('../errors/custom-error');

const { UnauthenticatedError } = require("../errors/index")

// authentication functionality
const authenticationMiddleware = async(req, res, next)=>{
    const authHeader = req.headers.authorization

    // checking if the authHeader is present
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No token provided')
    }

    // accessing the token
    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded)
        const { id, username } = decoded
        // setting a user to the request
        req.user = {id, username}
        
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')       
    }

    // then passing all the content to the next middleware
    next()
}

// exporting
module.exports = authenticationMiddleware