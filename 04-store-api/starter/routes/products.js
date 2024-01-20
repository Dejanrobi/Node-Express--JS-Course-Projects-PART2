// setting the router

const express = require('express')
const router = express.Router()

// importing the products controller functions
const { getAllProducts, getAllProductsStatic } = require('../controllers/products')

// setting the routes using the router
router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)

// exporting the router
module.exports = router