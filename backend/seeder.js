const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product");
const User = require("./models/User");
const Cart= require("./models/cart");
const products = require("./data/products");

dotenv.config();

// connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// function to seed data
const seedData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        const createdUser = await User.create({
            name: "Admin user",
            email: "admin@gmail.com",
            password: "123456",
            role: "admin",
        });

        const userId = createdUser._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: userId };
        });

        await Product.insertMany(sampleProducts); // ✅ Corrected here

        console.log("Product data seeded successfully");
        process.exit();
    } catch (error) {
        console.log("Error seeding the data:", error);
        process.exit(1);
    }
};

seedData();
