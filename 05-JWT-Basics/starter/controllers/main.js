// importing JWT
const jwt = require('jsonwebtoken')
// importing the Bad Request error

const { BadRequestError } = require("../errors/index")

// controllers
const login = async(req, res)=>{
    // check for the login and password
    const { username, password } = req.body
    if(!username || !password){
        // throwing an error with a custom message and a status code
        throw new BadRequestError('Please provide email and password')

    }
    // dummy id 
    const id = new Date().getDate()

    // creating a new token using the sign 
    // we pass in the payload(an object) with the secret key, options(i.e expiresIn)
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'})


    res.status(200).json({msg: 'user created!', token})
}

const dashboard = async(req, res)=>{
    console.log(req.user)
    
    res.status(200).json({msg: `Hello, ${req.user.username}`, secret: `Here is your secret code: ${req.user.id}`})
    
}

// exporting the controllers
module.exports = {
    login,
    dashboard
}