const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongoodb is connected");
    } catch(err){
        console.log("mongoodb connection failed",err);
        process.exit(1);
    }
};
module.exports=connectDB;