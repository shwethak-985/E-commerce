const express=require("express");
const router=express.Router();
const Subscriber=require("../models/Subriber");

//subscribe
router .post("/subscriber",async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.status(400).json({message:"email is required"});

    }
    try {
        let subscriber=await Subscriber.findOne({email});
        if(subscriber){
            return res.status(400).json({message:"email is alredy subscribed"});
        }
        subscriber=new Subscriber({email});
        await subscriber.save();
        res.status(201).json({message:"Successfully subscribed to the newsletter!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error"});
    }
})
module.exports=router;