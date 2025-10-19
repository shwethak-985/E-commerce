import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchProductDetails, updateProduct } from '../../../Redux/slice/productsSlice';

const EditProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { selectedProduct, loading, error } = useSelector((state) => state.products);

    const [product, setProduct] = useState({
        name: "",
        price: "",
        sku: "",
        description: "",
        countingstock: 0,
        category: "",
        Brand: "",
        sizes: [],
        colors: [],
        collections: "",
        materials: "",
        gender: "",
        images: [],
    });

    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetails(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedProduct && selectedProduct._id === id) {
            setProduct(selectedProduct);
        }
    }, [selectedProduct, id]);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        try {
            setUploading(true);
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setProduct((prevData) => ({
                ...prevData,
                images: [...prevData.images, { url: data.imageUrl, altText: "" }],
            }));
            setUploading(false);
        } catch (error) {
            console.error("Image upload failed:", error);
            setUploading(false);
        }
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ id, productData: product }));
        navigate("/admin/products");
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
            <h2 className='text-2xl font-bold text-center'>Edit Product</h2>
            <form onSubmit={handlesubmit} className='space-y-4'>
                {/* Product Name */}
                <div className='flex flex-col'>
                    <label htmlFor="name" className='font-semibold'>Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handlechange}
                        className='border p-2 rounded-md'
                        required
                    />
                </div>

                {/* Price */}
                <div className='flex flex-col'>
                    <label htmlFor="price" className='font-semibold'>Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handlechange}
                        className='border p-2 rounded-md'
                        required
                    />
                </div>

                {/* Description */}
                <div className='flex flex-col'>
                    <label htmlFor="description" className='font-semibold'>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handlechange}
                        className='border p-2 rounded-md'
                        required
                    ></textarea>
                </div>

                {/* Counting Stock */}
                <div className='flex flex-col'>
                    <label htmlFor="countingstock" className='font-semibold'>Counting Stock</label>
                    <input
                        type="number"
                        id="countingstock"
                        name="countingstock"
                        value={product.countingstock}
                        onChange={handlechange}
                        className='border p-2 rounded-md'
                        required
                    />
                </div>

                {/* SKU */}
                <div className='flex flex-col'>
                    <label htmlFor="sku" className='font-semibold'>SKU</label>
                    <input
                        type="text"
                        id="sku"
                        name="sku"
                        value={product.sku}
                        onChange={handlechange}
                        className='border p-2 rounded-md'
                        required
                    />
                </div>

                {/* Category */}
                <div className='flex flex-col'>
                    <label htmlFor="category" className='font-semibold'>Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handlechange}
                        className='border p-2 rounded-md'
                        required
                    />
                </div>

                {/* Brand */}
                <div className='flex flex-col'>
                    <label htmlFor="Brand" className='font-semibold'>Brand</label>
                    <input
                        type="text"
                        id="Brand"
                        name="Brand"
                        value={product.Brand}
                        onChange={handlechange}
                        className='border p-2 rounded-md'
                        required
                    />
                </div>

                {/* Sizes */}
                <div className='flex flex-col'>
                    <label htmlFor="sizes" className='font-semibold'>Sizes</label>
                    <input
                        type="text"
                        id="sizes"
                        name="sizes"
                        value={product.sizes?.join(", ")}
                        onChange={(e) =>
                            setProduct((prev) => ({
                                ...prev,
                                sizes: e.target.value.split(",").map((s) => s.trim()),
                            }))
                        }
                        className='border p-2 rounded-md'
                        placeholder="Enter sizes separated by commas"
                    />
                </div>

                {/* Colors */}
                <div className='flex flex-col'>
                    <label htmlFor="colors" className='font-semibold'>Colors</label>
                    <input
                        type="text"
                        id="colors"
                        name="colors"
                        value={product.colors?.join(", ")}
                        onChange={(e) =>
                            setProduct((prev) => ({
                                ...prev,
                                colors: e.target.value.split(",").map((c) => c.trim()),
                            }))
                        }
                        className='border p-2 rounded-md'
                        placeholder="Enter colors separated by commas"
                    />
                </div>

                {/* Upload Image */}
                <div className='flex flex-col'>
                    <label htmlFor="uploadimage" className='font-semibold'>Upload Image</label>
                    <input
                        type="file"
                        id="uploadimage"
                        name="uploadimage"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className='border p-2 rounded-md'
                    />
                    {uploading && <p>Uploading image...</p>}
                    <div className='flex flex-wrap gap-2 mt-2'>
                        {product.images.map((image, index) => (
                            <div key={index}>
                                <img
                                    src={image.url}
                                    alt={`Product Image ${index + 1}`}
                                    className='w-24 h-24 object-cover rounded-md'
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className='w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600'
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
