const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/product");
const router = express.Router();
const { protect } = require("../Middleware/authmiddleware")

// Helper function to get the user's or guest's cart
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    } else {
        return null;
    }
};

// Add a product to the cart
router.post("/", async (req, res) => {
    let { productId, quantity, size, color, guestId, userId } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Validate quantity
        quantity = parseInt(quantity);
        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        // Generate guestId if not provided
        if (!userId && !guestId) {
            guestId = "guest_" + new Date().getTime();
        }

        let cartQuery = {};
        if (userId) {
            cartQuery.userId = userId;
        } else if (guestId) {
            cartQuery.guestId = guestId;
        }

        let cart = await Cart.findOne(cartQuery);

        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images?.[0]?.url || "",
                    price: product.price,
                    quantity,
                    size,
                    color
                });
            }

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            const newCart = await Cart.create({
                userId: userId ? userId : undefined,
                guestId: userId ? undefined : guestId,
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images?.[0]?.url || "",
                        price: product.price,
                        quantity,
                        size,
                        color
                    }
                ],
                totalPrice: product.price * quantity
            });

            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error("Cart error:", error.message);
        res.status(500).send("Server error");
    }
});

// Update cart
router.put("/", async (req, res) => {
    let { userId, guestId, productId, quantity, size, color } = req.body;

    try {
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Validate quantity
        quantity = parseInt(quantity);
        if (isNaN(quantity)) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex > -1) {
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex, 1);
            }

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error("Update cart error:", error.message);
        res.status(500).send("Server error");
    }
});

// Delete product from cart
router.delete("/", async (req, res) => {
    const { productId, userId, guestId, size, color } = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error("Delete cart error:", error.message);
        res.status(500).send("Server error");
    }
});

// Get logged in user cart or guest cart
router.get("/", async (req, res) => {
    const { userId, guestId } = req.query;

    if (!userId && !guestId) {
        return res.status(400).json({ message: "Either userId or guestId is required" });
    }

    try {
        const cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error.message);
        res.status(500).send("Server error");
    }
});

// Merge guest cart into user cart on login
router.post("/merge", protect,async (req, res) => {
    const {  guestId } = req.body;
    try {
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });

        if(guestCart){
            if(guestCart.products.length ===0){
                return res.status(400).json({ message: "Guest cart is empty" });

            }
            if(userCart){
                guestCart.products.forEach((guestItems)=>{
                    const productIndex=userCart.products.findIndex((item)=>
                        item.productId.toString()===guestItems.productId.toString()&&
                        item.size===guestItems.size&&
                        item.color===guestItems.color
                    );
                    if(productIndex>-1){
                        userCart.products[productIndex].quantity+=guestItems.quantity;
                    }
                    else{
                        userCart.products.push(guestItems);
                    }
                }
                );
                userCart.totalPrice = userCart.products.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                );
                await userCart.save();
                try {
                    await Cart.findOneAndDelete({ guestId });
                    
                } catch (error) {
                    console.error("Error saving user cart:", error);
                   
                    
                }
                return res.status(200).json(userCart);
            }else{
                guestCart.user=req.user._id;
                guestCart.guestId=undefined;
                await guestCart.save();
                res.status(200).json(guestCart);
            }
        }else{
            if(userCart){
                return res.status(200).json(userCart);
            }
            res.status(404).json({ message: "No cart found" });
        }
                
        
    } catch (error) {
        console.error("Error merging cart:", error);
        res.status(500).send("Server error");

        
    }
}
    


    
);
 module.exports = router;