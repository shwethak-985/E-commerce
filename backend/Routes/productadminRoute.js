const express=require ("express");
const Product=require("../models/product")
const {protect,admin}=require("../Middleware/authmiddleware");
const router=express.Router();

router.get("/",protect,admin,async(req,res)=>{
    try {
        const products=await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });

        
    }
});

module.exports=router;