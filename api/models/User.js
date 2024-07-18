const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
    {
        email:{type: String, required:true, unique:true},
        firstname:{type: String, required:true},
        lastname: {type: String, required: true},
        phone:{type: String, required:true, },
        password: {type: String, required: true},
        gender:{type: String},
        dateOfbirth:{type: String},
        profilePic: {type: String, default: ""},
    },{timestamps:true});

    module.exports = mongoose.model("User", UserSchema); 