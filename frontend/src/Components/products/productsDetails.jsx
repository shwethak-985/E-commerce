import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts } from '../../../Redux/slice/productsSlice';
import { addToCart } from '../../../Redux/slice/cartSlice';

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const productfetchId = productId || id;

  useEffect(() => {
    if (productfetchId) {
      dispatch(fetchProductDetails(productfetchId));
      dispatch(fetchSimilarProducts({ id: productfetchId }));
    }
  }, [dispatch, productfetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  

  // Use correct fields for colors and sizes with fallback defaults
  const colorsToDisplay = Array.isArray(selectedProduct?.colors) && selectedProduct.colors.length > 0
    ? selectedProduct.colors
    : ['Red', 'Blue', 'Green'];

  const sizesToDisplay = Array.isArray(selectedProduct?.sizes) && selectedProduct.sizes.length > 0
    ? selectedProduct.sizes
    : ['S', 'M', 'L'];

  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);
  const handleIncrease = () => setQuantity(quantity + 1);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color", { duration: 1000 });
      return;
    }

    dispatch(
      addToCart({
        productId: productfetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    ).then(() => toast.success("Product added to the cart", { duration: 1000 }));
  };

  if (loading) return <p className="text-center mt-4">Loading product details...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">Error: {error}</p>;
  if (!selectedProduct) return <p className="text-center mt-4">No product found.</p>;

  return (
    <div className="p-6">
      <div className="bg-white mx-auto p-8 rounded-lg max-w-6xl">
        <div className="flex flex-col md:flex-row">
          {/* Thumbnails (Desktop) */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-2/3">
            <div className="mb-4">
              <img
                src={mainImage || '/default-product.png'}
                alt={selectedProduct.name || "Main Product"}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* Thumbnails for Mobile */}
            <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
              {selectedProduct.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/3 md:ml-10 mt-6 md:mt-0">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-700 mb-1 line-through">
              {selectedProduct.originalprice && `$${selectedProduct.originalprice}`}
            </p>
            <p className="text-xl text-gray-600 mb-2">${selectedProduct.price}</p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            {/* Color Selection */}
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {colorsToDisplay.map((color) => {
                  const bgColor = color.toLowerCase();
                  return (
                    <button
                      key={color}
                      onClick={() => {
                        console.log("Color selected:", color);
                        setSelectedColor(color);
                      }}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color ? "border-4 border-black" : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: bgColor,
                        filter: "brightness(0.6)",
                      }}
                    ></button>
                  );
                })}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {sizesToDisplay.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      console.log("Size selected:", size);
                      setSelectedSize(size);
                    }}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size ? "bg-black text-white" : "hover:bg-gray-200"
                    }`}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Control */}
            <div className="mb-6">
              <p className="text-gray-600">Quantity</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={handleDecrease}
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={handleIncrease}
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="bg-black text-white py-2 px-6 rounded w-full mb-4"
              disabled={!selectedSize || !selectedColor}
            >
              {selectedSize && selectedColor ? "ADD TO CART" : "Select Size & Color"}
            </button>

            {/* Characteristics Table */}
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">You May Also Like</h2>
          <ProductGrid products={similarProducts} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
