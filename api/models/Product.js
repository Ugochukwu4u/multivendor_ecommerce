const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        productTitle:{type: String, required:true, unique:true},
        categories: {type: Array},
        size: {type: Array},
        color: {type: Array},
        model:{type: String, required: true},
        price: {type: Number,  required: true},
        initialPrice:{type: Number, required: true},
        productDescription:{type: String, required: true},
        brand:{type: String, required: true},
        productLine:{type: String},
        totalProduct:{type: Number, required: true},
        productLeft:{type: Number, required: true},
        flashSales: {type: Boolean, default: false},
        payOnDelivery:{type: Boolean, default: false},
        shippingLocation:{type: String, required: true},
        shippingFee:{type: Number, required: true},
        specification:{type:Array},
        boxContent:{type:Array},
        outOfStock:{type: Boolean, default: false},
        img_1: {type: String, required: true},
        img_2: {type: String, required: true},
        img_3: {type: String, required: true},
        img_4:{type: String, required: true},
        vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true }
    },{timestamps:true});

module.exports = mongoose.model("Product", ProductSchema); 