const express=require("express");
const User=require("../models/User");
const {protect,admin}=require("../Middleware/authmiddleware");

const router=express.Router();



router.get("/",protect,admin,async(req,res)=>{
    try {
        const users=await User.find({});
        res.json(users);
    } catch (error) {
        console.error(error);
         res.status(500).json({ message: "Internal server error" });
        
    }
});
//add users
router.post("/",protect,admin,async(req,res)=>{
    const {name,email,password,role}=req.body;
    try {
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"user alredy exists"});

        }
        user=new User({
            name,
            email,password,
            role:role||"customer",
        });
        await user.save();
        res.status(201).json({message:"user created successfully",user})

        
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: "Internal server error" });
        
    }
});

router.put("/:id",protect,admin,async(req,res)=>{
    try {
        const user=await User.findById(req.params.id);
        if(user){
            user.name=req.body.name||user.name;
            user.email=req.body.email||user.email;
            user.role=req.body.role||user.role;
        }
        const updateUser=await user.save();
        res.json({message:"user updated successfully",user:updateUser});
        
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: "Internal server error" });
        
    }
});

//detete

router.delete("/:id",protect,admin,async(req,res)=>{
    try {
        const user=await User.findById(req.params.id);
        if(user){
            await User.deleteOne();
            res.json({message:"user deleated successfully"})
        }else{
            res.status(404).json({message:"user not found"})
        }

        
    } catch (error) {
         console.error(error);
    res.status(500).json({ message: "Internal server error" });
        
        
    }
});

module.exports=router;

