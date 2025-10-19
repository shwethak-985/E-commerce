const express = require("express");
const Order = require("../models/order");
const {protect} = require("../Middleware/authmiddleware");
const router = express.Router();

//get all orders
router.get("/my-orders", protect, async (req, res) => {
    try {
        const orders=await Order.find({user:req.user._id}).populate("user", "name email").sort({createdAt:-1});
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
        
    });
    //get order by id
    router.get("/:id", protect, async (req, res) => {
        try {
            const order=await Order.findById(req.params.id).populate("user", "name email");
            if(!order){
                return res.status(404).json({message:"Order not found"});
            }
            //order
            res.status(200).json(order);
        }
        catch(error){
            console.log(error);
            res.status(500).json({message:"Internal server error"});
        }
    });

    // Create new order
router.post("/", protect, async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      isPaid,
      paidAt,
      paymentStatus,
      status
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // Calculate totalPrice
    const totalPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const newOrder = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isPaid,
      paidAt,
      paymentStatus,
      status
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});


    module.exports = router;