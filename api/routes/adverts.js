const router = require('express').Router();
const Advert = require("../models/Advert");
const {  verifyTokenAndAdmin } = require('../verifyToken');


//Create Advert
router.post('/', verifyTokenAndAdmin, async (req,res)=>{
    const newAdvert = new Advert(req.body);
    try{
        const savedAdvert = await newAdvert.save();
        res.status(200).json(savedAdvert);
    }catch(err){
        res.status(500).json(err);
    }
});

// //UPDATE ADVERT
router.put("/:id",verifyTokenAndAdmin, async(req, res)=>{
    try{
        const updatedAdvert = await Advert.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedAdvert);
    }catch(err){
        res.status(500).json(err);
    }
});
// //DELETE ADVERT
router.delete("/:id",verifyTokenAndAdmin, async(req, res)=>{
    try{
        await Advert.findByIdAndDelete(req.params.id);
           res.status(200).json("Advert has been deleted");
       }catch(err){
           res.status(500).json(err);
       }
});
//GET ONE ADVERT BY ID
router.get("/find/:id", async(req, res)=>{
    try{
     const advert = await Advert.findById(req.params.id);
        res.status(200).json(advert);
    }catch(err){
        res.status(500).json(err);
    }
});