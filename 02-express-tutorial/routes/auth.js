const express = require('express')

const router = express.Router()

// import people array
let  { people } = require('../data')


// post request from the login form
router.post('/', (req, res)=>{
    // obtaining the parsed name
    const { name } = req.body

    if(name){
        return res.status(200).send(`Welcome: ${name}`)
    }
    return res.status(401).send("Please Provide Credentials")
})


module.exports = router;