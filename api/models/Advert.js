const mongoose = require('mongoose');

const  AdvertSchema = new mongoose.Schema(
    {
        advertTitle:{type: String, required:true},
        img: {type: String, required: true},
        advertDesc:{type: String},
        duration:{type: String},
        categories: {type: Array},
        phone:{type: Number},
        background:{type: String}

    },{timestamps:true});

module.exports = mongoose.model("Advert", AdvertSchema); 