// setting the router
const express = require("express");
const router = express.Router()

// importing the controller functions
const { login, register } = require("../controllers/auth")

// setting the routes
router.post('/login', login)
router.post('/register', register)

// exporting the router
module.exports = router