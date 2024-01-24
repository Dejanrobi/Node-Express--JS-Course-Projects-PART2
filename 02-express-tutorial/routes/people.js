const express = require('express');

const router = express.Router();


// importing all the functions from the controller folder
const {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
} = require('../controllers/people')


// Another way of setting up the routes
// since the paths of get and post do not change, we can write them on the same line
router.route('/').get(getPeople).post(createPerson)
router.route('/postman').post(createPersonPostman)
// since the path doesn't change, we can add them on the same line
router.route('/:id').put(updatePerson).delete(deletePerson)



module.exports = router