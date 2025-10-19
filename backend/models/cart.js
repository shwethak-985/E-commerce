const mongoose= require("mongoose");
const products = require("../data/products");
const cartItemsSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name:String,
    image:String,
    price:String,
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    size:String,
    color:String,
},{_id:false}
);
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    },
    guestId: {
        type: String,
        
    },
    products: [cartItemsSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
},{ timestamps: true }
);
module.exports = mongoose.model("Cart", cartSchema);