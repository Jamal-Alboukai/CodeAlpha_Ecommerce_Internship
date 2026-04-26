const express = require('express');
const router = express.Router();
const{ getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// Define routes for product operations
router.route('/')
    .get(getProducts) // Get all products
    .post(createProduct); // Create a new product
router.route('/:id')
    .get(getProductById) // Get a product by ID
    .put(updateProduct) // Update a product by ID
    .delete(deleteProduct); // Delete a product by ID   

module.exports = router;