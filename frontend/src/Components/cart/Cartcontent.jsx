import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../../Redux/slice/cartSlice';

const Cartcontent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <div>
      {cart?.products?.length > 0 ? (
        cart.products.map((product, index) => {
          console.log("Cart Product:", product);

          // Robust image URL fallback
          const imageUrl =
  typeof product.image === "string" && product.image.trim() !== ''
    ? product.image
    : product?.images && product.images.length > 0 && product.images[0].url && product.images[0].url.trim() !== ''
    ? product.images[0].url
    : null;


          if (!imageUrl) {
            console.warn(`No image found for product ${product.productId || product.id || 'unknown'}`);
          }

          return (
            <div
              key={index}
              className="flex items-start justify-between mb-4 p-4 border-b"
            >
              <div className="flex items-start">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-16 h-24 object-cover mr-4 rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder.jpg'; // fallback image
                    }}
                  />
                ) : (
                  <div className="w-16 h-24 bg-gray-200 mr-4 flex items-center justify-center rounded text-sm text-gray-500">
                    No Image
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    Size: {product.size} | Color: {product.color}
                  </p>
                  <div className="mt-2 flex items-center">
                    <button
                      onClick={() =>
                        handleAddToCart(
                          product.productId,
                          -1,
                          product.quantity,
                          product.size,
                          product.color
                        )
                      }
                      className="border rounded px-3 py-1 text-lg font-medium"
                    >
                      -
                    </button>
                    <span className="mx-3">{product.quantity}</span>
                    <button
                      onClick={() =>
                        handleAddToCart(
                          product.productId,
                          1,
                          product.quantity,
                          product.size,
                          product.color
                        )
                      }
                      className="border rounded px-3 py-1 text-lg font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-black">${product.price}</p>
                <button
                  onClick={() =>
                    handleRemoveFromCart(
                      product.productId,
                      product.size,
                      product.color
                    )
                  }
                  aria-label="Remove item"
                  className="text-red-600 hover:text-red-800 mt-2 text-xl"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-600 mt-4">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cartcontent;
