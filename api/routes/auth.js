const router = require('express').Router();
const User = require("../models/User");
const Seller  =  require('../models/Seller');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

//Register User
router.post('/register', async(req, res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            email: req.body.email,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            phone:req.body.phone,
            password: hashedPassword,
            gender:req.body.gender,
            dateOfbirth:req.body.dateOfbirth,
        });    
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});
//Login User

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json("Wrong password or email");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(401).json("Wrong password or email");
        }

        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: "30d" });
        const { password, ...info } = user._doc;

        res.status(200).json({ ...info, accessToken });
    } catch (err) {
        console.error("Error in login route:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Register Seller
router.post('/seller_register', async(req, res)=>{
    try {
        const hashedSellerPassword = await bcrypt.hash(req.body.password, 10);
        const newSeller = new Seller({
            email: req.body.email,
            companyName:req.body.companyName,
            companyAddress:req.body.companyAddress,
            companyRegistrationNo:req.body.companyRegistrationNo,
            aboutCompany:req.body.aboutCompany,
            phone:req.body.phone,
            password: hashedSellerPassword,
        });    
        const seller = await newSeller.save();
        res.status(200).json(seller);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Login Seller

router.post("/login_seller", async (req, res) => {
    try {
        const seller = await Seller.findOne({ email: req.body.email });

        if (!seller) {
            return res.status(401).json("Wrong password or email");
        }

        const validPassword = await bcrypt.compare(req.body.password, seller.password);

        if (!validPassword) {
            return res.status(401).json("Wrong password or email");
        }

        const accessToken = jwt.sign({ id: seller._id, isAdmin: seller.isAdmin }, process.env.SECRET_KEY, { expiresIn: "30d" });
        const { password, ...info } = seller._doc;

        res.status(200).json({ ...info, accessToken });
    } catch (err) {
        console.error("Error in login route:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
