const express = require("express");
const Product = require("../models/product");
const {protect,admin}=require("../Middleware/authmiddleware")

const router = express.Router();

// Update Product Route
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const {
            name, description, price, discountPrice, countInStock,
            category, brand, sizes, colors, collections,
            material, gender, images, isFeatured, isPublished,
            tags, dimensions, weight, sku
        } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.colors = colors || product.colors;
            product.collections = collections || product.collections;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;

            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// Delete Product Route
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: "Product removed" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// Get Products with Filters & Sorting
router.get("/", async (req, res) => {
    try {
        const {
            collection, size, color, gender,
            minPrice, maxPrice, sortBy, search,
            category, material, brand, limit
        } = req.query;

        let query = {};

        if (collection && collection.toLowerCase() !== "all") {
            query.collections = collection;
        }
        if (category && category.toLowerCase() !== "all") {
    query.category = { $regex: new RegExp(`^${category}$`, "i") };
}

        if (material) {
            query.material = { $in: material.split(",") };
        }
        if (brand) {
            query.brand = { $in: brand.split(",") };
        }
        if (size) {
            query.sizes = { $in: size.split(",") }; 
        }
        if (color) {
            query.colors = { $in: [color] };
        }
        if (gender) {
            query.gender = gender;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        let sort = {};

        if (sortBy) {
            switch(sortBy){
                case "priceAsc":
                    sort={price:1};
                    break;
                case "priceDesc":
                    sort={price:-1};
                    break;
                case "popularity":
                    sort={rating:-1};
                    break;
                default:
                    break;
            }
        }
        let products = await Product.find(query).sort(sort).limit(Number(limit) || 0);

        res.json(products);


    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
//best seller products
router.get("/best-seller",async(req,res)=>{
    try {
        const products = await Product.find({}).sort({ rating: -1, numReviews: -1 }).limit(10);

        if(products){
             res.json(products);

        }else{
            res.status(404).json({message:"products not found"})
        }
       
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
        
    }
});
//new arrival products
router.get("/new-arrival",async(req,res)=>{
    try {
        const newproducts=await Product.find({}).sort({createdAt:-1}).limit(8);
        if(newproducts){
             res.json(newproducts);

        }else{
            res.status(404).json({message:"products not found"})
        }
       
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
        
    }
});
//get similar products
router.get("/similar/:id",async(req,res)=>{
    const { id } = req.params;
    try {
        const product=await Product.findById(id);
        if(!product){
            return res.status(404).json({message:"product not found"})
        }
        const similarProducts=await Product.find({
            _id: { $ne: id },
            gender: product.gender,
            category: product.category,
        }).limit(4);
        res.json(similarProducts);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
        
    }
});


//single product

router.get("/:id",async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id);
        if(product){
            res.json(product);
        }
        else{
            res.status(404).json({message:"product not found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
        
    }
})


module.exports = router;
