const Product = require('../models/Product');
// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);      
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, imageUrl,countInStock } = req.body;
        const product = new Product({
            name,
            description,
            price,
            category,
            imageUrl,
            countInStock
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const updateProduct = async (req, res) => {     
    try {
        const { name, description, price, category, imageUrl,countInStock } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category, imageUrl,countInStock },
            { new: true }
        );
        if (updatedProduct) {
            res.json(updatedProduct);
        }   else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }               
};
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);      
        if (deletedProduct) {
            res.json({ message: "Product deleted successfully" });
        }
            else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }   
};


module.exports = { getProducts, getProductById , createProduct , updateProduct , deleteProduct };