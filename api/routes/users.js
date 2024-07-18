const router = require('express').Router();
const User = require("../models/User");
const Seller = require("../models/Seller");
const bcrypt = require('bcrypt');
const { verify, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../verifyToken');

//GET ALL USERS
router.get("/",verifyTokenAndAdmin, async(req, res)=>{
    const query = req.query.new;
    try{
        const users = query ?  await User.find().sort({_id: -1}).limit(5) : await User.find(); 
           res.status(200).json(users);
       }catch(err){
           res.status(500).json(err);
       }
});
//GET ONE USER
router.get("/find/:id",verifyTokenAndAdmin, async(req, res)=>{
    try{
     const user = await User.findById(req.params.id);
     const{password, ...info} = user._doc;
        res.status(200).json(info);
    }catch(err){
        res.status(500).json(err);
    }
});
//UPDATE USER
router.put("/:id",verifyTokenAndAuthorization, async(req, res)=>{
    if(req.body.password){
        req.body.password = await bcrypt.hash(req.body.password, 10);
        // req.body.password = bcrypt.hash(req.body.password, 10);
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err);
    }
});
//DELETE USER
router.delete("/:id",verifyTokenAndAuthorization, async(req, res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
           res.status(200).json("User has been deleted");
       }catch(err){
           res.status(500).json(err);
       }
});

//GET USER STATISTICS (TOTAL USER PER MONTH)
router.get("/stats", async (req, res) => {
    const today = new Date();
    const lastYear = new Date();
    lastYear.setFullYear(today.getFullYear() - 1);

    const monthArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    try {
        const data = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: lastYear, $lte: today }
                }
            },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: { _id: "$month", total: { $sum: 1 } }
            }
        ]);

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

//SELLER  ROUTES

//GET ALL SELLERS
router.get("/seller",verifyTokenAndAdmin, async(req, res)=>{
    const query = req.query.new;
    try{
        const sellers = query ?  await Seller.find().sort({_id: -1}).limit(5) : await Seller.find(); 
           res.status(200).json(sellers);
       }catch(err){
           res.status(500).json(err);
       }
});
//GET ONE SELLER
router.get("/seller/find/:id",verifyTokenAndAdmin, async(req, res)=>{
    try{
     const seller = await Seller.findById(req.params.id);
     const{password, ...info} = seller._doc;
        res.status(200).json(info);
    }catch(err){
        res.status(500).json(err);
    }
});
//UPDATE SELLER
router.put("/seller/:id",verifyTokenAndAuthorization, async(req, res)=>{
    if(req.body.password){
        req.body.password = await bcrypt.hash(req.body.password, 10);
        // req.body.password = bcrypt.hash(req.body.password, 10);
    }
    try{
        const updatedSeller = await Seller.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedSeller);
    }catch(err){
        res.status(500).json(err);
    }
});
//DELETE SELLER
router.delete("/seller/:id",verifyTokenAndAuthorization, async(req, res)=>{
    try{
        await Seller.findByIdAndDelete(req.params.id);
           res.status(200).json("Seller has been deleted");
       }catch(err){
           res.status(500).json(err);
       }
});

//GET SELLER STATISTICS (TOTAL USER PER MONTH)
router.get("/seller/stats", async (req, res) => {
    const today = new Date();
    const lastYear = new Date();
    lastYear.setFullYear(today.getFullYear() - 1);

    const monthArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    try {
        const data = await Seller.aggregate([
            {
                $match: {
                    createdAt: { $gte: lastYear, $lte: today }
                }
            },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: { _id: "$month", total: { $sum: 1 } }
            }
        ]);

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});





module.exports = router;