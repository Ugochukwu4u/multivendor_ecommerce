const router = require('express').Router();
const Product = require("../models/Product");
const Order = require('../models/Order');
const { verify, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../verifyToken');

//Create Product
router.post('/', verify, async (req,res)=>{
    const newProduct = new Product(req.body);
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
});
// //UPDATE PRODUCT
router.put("/:id",verifyTokenAndAuthorization, async(req, res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedProduct);
    }catch(err){
        res.status(500).json(err);
    }
});
// //DELETE PRODUCT
router.delete("/:id",verifyTokenAndAuthorization, async(req, res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
           res.status(200).json("Product has been deleted");
       }catch(err){
           res.status(500).json(err);
       }
});
//GET ONE PRODUCT BY ID
router.get("/find/:id", async(req, res)=>{
    try{
     const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
});
//GET ONE PRODUCT by title
router.get("/title/:productTitle", async(req, res)=>{
    const productTitle = req.params.productTitle;
    try{
     const product = await Product.findOne({productTitle: productTitle});
     if(!product){
        return res.status(404).json({message:'product not found'})
     }
        res.status(200).json(product);
    }catch(err){
        console.error(err);
        res.status(500).json({
            error:'Internal server error',
            message:err.message
        });
    }
});
//GET latest PRODUCTS
router.get("/latest-products", async (req, res) => {
    const qNew = req.query.new;
    const qCategories = req.query.categories ? req.query.categories.split(',') : [];

    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategories.length > 0) {
            products = await Product.find({ categories: { $in: qCategories } }).limit(5);
        } else {
            products = await Product.find().limit(30);
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});
// GET ALL PRODUCTS OR BY CATEGORY
router.get("/", async (req, res) => {
    const qCategory = req.query.category;

    try {
        let products;

        if (qCategory) {
            products = await Product.find({ categories: { $in: qCategory.split(',') } });
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
});
// GET FLASH SALES PRODUCTS
router.get("/", async (req, res) => {
    const { flashSales } = req.query;

    try {
        let products;

        if (flashSales === 'true') {
            products = await Product.find({ flashSales: true });
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// GET  TOP FIVE FLASH SALES PRODUCTS
router.get("/top-five", async (req, res) => {
    const { flashSales } = req.query;

    try {
        let products;

        if (flashSales === 'true') {
            products = await Product.find({ flashSales: true }).limit(5);
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// GET TOTAL NUMBER OF PRODUCTS
router.get("/total-products", async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();

        res.status(200).json({ totalProducts });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
});

// GET PRODUCTS BY VENDOR
router.get("/vendor/:vendorId", async (req, res) => {
    try {
        const products = await Product.find({ vendorId: req.params.vendorId });

        if (!products) {
            return res.status(404).json({ message: 'No products found for this vendor' });
        }

        res.status(200).json(products);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
});
// GET TOTAL NUMBER OF PRODUCTS BY VENDOR
router.get("/vendor/:vendorId/total-products", async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments({ vendorId: req.params.vendorId });

        res.status(200).json({ totalProducts });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
});
// // GET RELATED PRODUCTS
// router.get("/related-products/:productId", async (req, res) => {
//     const productId = req.params.productId;

//     try {
//         // Find the current product by ID
//         const currentProduct = await Product.findById(productId);
//         if (!currentProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         // Find related products by the same category and brand
//         const relatedProducts = await Product.find({
//             _id: { $ne: productId }, // Exclude the current product
//             categories: { $in: currentProduct.categories },
//             brand: currentProduct.brand
//         }).limit(5); // Limit to 5 related products or adjust as needed

//         res.status(200).json(relatedProducts);
//     } catch (err) {
//         console.error(err); // Log the error for debugging
//         res.status(500).json({
//             error: 'Internal server error',
//             message: err.message
//         });
//     }
// });

// GET RELATED PRODUCTS BY TITLE
router.get("/related-products/:productTitle", async (req, res) => {
    const productTitle = req.params.productTitle;

    try {
        // Find the current product by title
        const currentProduct = await Product.findOne({ productTitle: req.params.productTitle });
        if (!currentProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find related products by the same category and brand
        const relatedProducts = await Product.find({
            productTitle: { $ne: currentProduct.productTitle }, // Exclude the current product
            categories: { $in: currentProduct.categories },
            brand: currentProduct.brand
        }).limit(5); // Limit to 5 related products or adjust as needed

        res.status(200).json(relatedProducts);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
});

// GET TOP-SELLING PRODUCTS
router.get("/top-selling-products", async (req, res) => {
    try {
        // Aggregate sales data from orders
        const salesData = await Order.aggregate([
            { $unwind: '$products' },
            {
                $group: {
                    _id: '$products.productId',
                    totalSold: { $sum: '$products.quantity' }
                }
            },
            { $sort: { totalSold: -1 } }, // Sort by totalSold in descending order
            { $limit: 5 } // Limit to top 5 products
        ]);

        // Fetch product details for the top-selling products
        const topSellingProducts = await Product.find({
            _id: { $in: salesData.map(data => data._id) }
        });

        // Map sales data to product details
        const result = topSellingProducts.map(product => {
            const salesInfo = salesData.find(data => data._id.equals(product._id));
            return {
                product,
                totalSold: salesInfo.totalSold
            };
        });

        res.status(200).json(result);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
});


module.exports = router;