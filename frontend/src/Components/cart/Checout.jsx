import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaypalButton from './PaypalButton';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../../Redux/slice/checkoutSlice';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const formattedItems = cart.products.map(product => ({
        productId: product._id || product.productId,
        name: product.name,
        image: product.images && product.images.length > 0
          ? product.images[0].url
          : 'default-image.jpg', // fallback image string (non-empty)
        price: Number(product.price),
        quantity: product.quantity || 1,
        size: product.size,
        color: product.color,
      }));

      const res = await dispatch(
        createCheckout({
          checkoutItems: formattedItems,
          shippingAddress,
          paymentMethod: "PayPal",
          totalPrice: Number(cart.totalPrice) || 0,
        })
      );

      console.log("Checkout response:", res);
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      navigate("/order-conformation");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading cart..</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section - Form */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCheckout}>
          <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={user ? user.email : ""}
              className="w-full p-2 border rounded bg-gray-100"
              disabled
            />
          </div>

          <h3 className="text-lg font-semibold mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={shippingAddress.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={shippingAddress.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={shippingAddress.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={shippingAddress.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="mt-4 bg-black w-full text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Continue to Payment
              </button>
            ) : (
              <PaypalButton
                amount={Number(cart.totalPrice) || 0}
                currency="USD"
                onSuccess={handlePaymentSuccess}
                onError={() => alert("Payment failed. Try again")}
              />
            )}
          </div>
        </form>
      </div>

      {/* Right Section - Order Summary */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
        {cart.products.map((product, index) => (
          <div key={index} className="flex items-center mb-4">
            {product.image ? (
              <img
                src={
                  product.image.startsWith("http")
                    ? product.image
                    : `${backendUrl}${product.image}`
                }
                alt={product.name}
                className="w-20 h-20 object-cover rounded mr-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.jpg";
                }}
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded mr-4">
                <span className="text-gray-500 text-sm">No image</span>
              </div>

            )}
            <div className="flex-1">
              <h4 className="font-semibold">{product.name}</h4>
              <p className="text-sm text-gray-600">Size: {product.size}</p>
              <p className="text-sm text-gray-600">Color: {product.color}</p>
            </div>
            <p className="text-xl">${Number(product.price).toFixed(2)}</p>
          </div>
        ))}
        <hr className="my-4" />
        <div className="flex justify-between font-semibold text-lg">
          <span>Subtotal:</span>
          <span>${Number(cart.totalPrice).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Shipping:</span>
          <span>(Free Shipping)</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span>${Number(cart.totalPrice).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
