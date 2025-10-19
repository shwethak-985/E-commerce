const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./Routes/userRoutes');
const productRoutes=require('./Routes/productroutes')
const cartRoutes=require('./Routes/cartRoutes')
const checkoutRoutes=require('./Routes/checkoutroutes')
const orderRoutes=require('./Routes/orderRoutes')
const uploadRoutes=require('./Routes/uploadRoutes')
const subscribeRoutes=require("./Routes/subscribeRoute")
const adminRoute=require("./Routes/adminRoute");
const productadminRoute=require("./Routes/productadminRoute");
const adminorderRoute=require("./Routes/adminorderRoute");

dotenv.config(); // Load .env before using process.env

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// connect to MongoDB
connectDB();

// base route
app.get('/', (req, res) => {
  res.send('Hello from server');
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/products',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/checkout',checkoutRoutes)
app.use('/api/orders',orderRoutes)
app.use("/api/upload",uploadRoutes)
app.use("/api",subscribeRoutes)
app.use("/api/admin/users",adminRoute)
app.use("/api/admin/products",productadminRoute)
app.use("/api/admin/orders",adminorderRoute);

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
