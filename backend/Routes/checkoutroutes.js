const express = require("express");
const router = express.Router();

const Checkout = require("../models/checkout");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Order = require("../models/order");
const {protect} = require("../Middleware/authmiddleware");

// Create a new checkout
router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;
  console.log("Request body:", req.body);

  if (!checkoutItems || !shippingAddress || !paymentMethod || !totalPrice) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pending",
      isPaid: false,
    });

    console.log(`Checkout created for user ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error creating checkout:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update payment status
router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paidAt = new Date();
      checkout.paymentDetails = paymentDetails;

      await checkout.save();
      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error updating checkout:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Finalize checkout and create order
router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      const finalOrder = await Order.create({
        user: req.user._id,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentDetails: checkout.paymentDetails,
        paymentStatus: checkout.paymentStatus,
      });

      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      await Cart.findOneAndDelete({ user: checkout.user });

      res.status(200).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "Checkout already finalized" });
    } else {
      res.status(400).json({ message: "Checkout not paid" });
    }
  } catch (error) {
    console.error("Error finalizing checkout:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
