const mongoose = require('mongoose');
const SellerSchema = new mongoose.Schema(
    {
        email:{type: String, required:true, unique:true},
        companyName:{type: String, required:true},
        companyAddress:{type: String, required:true},
        companyRegistrationNo:{type: String},
        aboutCompany:{type: String},
        phone:{type: String, required:true, },
        password: {type: String, required: true},
        profilePic: {type: String, default: ""},
        isAdmin: {type: Boolean, default: false},
    },{timestamps:true});

    module.exports = mongoose.model("Seller", SellerSchema); 