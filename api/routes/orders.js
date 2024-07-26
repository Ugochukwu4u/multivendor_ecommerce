const router = require('express').Router();
const mongoose = require('mongoose');
const Order = require("../models/Order");
const { verify, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../verifyToken');


//Create ORDER
router.post('/', verify, async (req,res)=>{
    const newOrder = new Order(req.body);
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }
});
// //UPDATE ORDER
router.put("/:id",verify, async(req, res)=>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedOrder);
    }catch(err){
        res.status(500).json(err);
    }
});
// //DELETE CART
router.delete("/:id",verifyTokenAndAdmin, async(req, res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
           res.status(200).json("Order has been deleted");
       }catch(err){
           res.status(500).json(err);
       }
});
//GET USER CART 
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
});
// //GET ALL 
router.get("/", verifyTokenAndAdmin, async(req,res)=>{
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});
// GET ORDERS BY VENDOR ID
router.get("/vendor/:vendorId", verifyTokenAndAuthorization, async (req, res) => {
    const vendorId = req.params.vendorId;

    try {
        const orders = await Order.find({ vendorId: vendorId });
        res.status(200).json(orders);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
});
// GET TOTAL ORDERS BY VENDOR ID
router.get("/vendor/:vendorId/total-orders", verifyTokenAndAuthorization, async (req, res) => {
    const vendorId = req.params.vendorId;

    try {
        const totalOrders = await Order.countDocuments({ vendorId: vendorId });
        res.status(200).json({ vendorId: vendorId, totalOrders: totalOrders });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
});
// GET TOTAL INCOME BY VENDOR ID
router.get("/vendor/:vendorId/total-income", verifyTokenAndAuthorization, async (req, res) => {
    const vendorId = req.params.vendorId;

    try {
        const totalIncome = await Order.aggregate([
            { $match: { vendorId: new mongoose.Types.ObjectId(vendorId) } },
            {
                $group: {
                    _id: "$vendorId",
                    totalIncome: { $sum: "$orderTotal" }
                }
            }
        ]);

        res.status(200).json({
            vendorId: vendorId,
            totalIncome: totalIncome.length > 0 ? totalIncome[0].totalIncome : 0
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
});
//GET MONTHLY INCOME
router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(lastMonth.setMonth(lastMonth.getMonth() - 1)); 

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: { month: { $month: "$createdAt" }, sales: "$amount" }
            },
            {
                $group: { _id: "$month", total: { $sum: "$sales" } } 
            }
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;