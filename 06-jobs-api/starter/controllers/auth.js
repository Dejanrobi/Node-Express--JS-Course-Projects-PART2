// importing the user model
const UserModel = require("../models/User")

// import status codes
const { StatusCodes } = require('http-status-codes')

const { BadRequestError, UnauthenticatedError }= require('../errors/index')

// register controller
const register = async  (req, res)=>{
    const {name, email, password} = req.body
    // validating whether the values  are present
    // any missing, throw an error
    if(!name){
        throw new BadRequestError("Please provide a name")
    }

    if(!email){
        throw new BadRequestError("Please provide an email")
    }

    if(!password){
        throw new BadRequestError("Please provide a password")
    }    

    // creating the user
    const user = await UserModel.create(req.body)

    // getting the created token from the schema method
    const token = user.createJWT()
    

    // send back the token to the front end
    res.status(StatusCodes.CREATED).json({user:{name: user.name}, token})

}


// login controller
const login = async  (req, res)=>{
    const { email, password } = req.body 

    // check if email  and password are present
    if(!email){
        throw new BadRequestError("Please provide an email")
    }

    if(!password){
        throw new BadRequestError("Please provide a password")
    }

    // check if the user is present
    const user = await  UserModel.findOne({email})

    // throw an error if user is not present
    if(!user){
        throw new UnauthenticatedError("Invalid Email")
    }

    // compare the password, 
    // password: this is the password passed by the user right now then compared to the one in the database.
    const isPasswordCorrect = await user.comparePassword(password)

    // throw an error if the password doesn't match
    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Invalid Password")
    }

    // create the JWT token
    const token = user.createJWT()

    // sending back a response with user's name and toke
    res.status(StatusCodes.OK).json({user:{name:user.name}, token})
    
}

module.exports = {
    register,
    login
}