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

// // people get request
// router.get('/', getPeople)

// // post request on the /api/people url
// router.post('/', createPerson)



// // adding the name that we send to the server as a json  into the people's array

// router.post('/postman', createPersonPostman)

// // updating data
// router.put('/:id', updatePerson)

// // deleting data
// router.delete('/:id', deletePerson)


// Another way of setting up the routes
// since the paths of get and post do not change, we can write them on the same line
router.route('/').get(getPeople).post(createPerson)
router.route('/postman').post(createPersonPostman)
// since the path doesn't change, we can add them on the same line
router.route('/:id').put(updatePerson).delete(deletePerson)



module.exports = router