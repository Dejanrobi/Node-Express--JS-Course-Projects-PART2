// setting the router
const express = require('express');
const router = express.Router()



// importing the controllers
const { login, dashboard } = require("../controllers/main")
// authentication middleware
const authenticationMiddleware  = require("../middleware/auth")

router.route('/dashboard').get(authenticationMiddleware, dashboard)
// login will be a post because we need to pass the user's credentials to the server
router.route('/login').post(login)


// exporting the router
module.exports = router