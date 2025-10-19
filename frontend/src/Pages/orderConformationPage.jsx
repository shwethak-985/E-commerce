import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../Redux/slice/cartSlice';


const OrderConfirmationPage = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {checkout}=useSelector((state)=>state.checkout);
  useEffect(()=>{
    if(checkout && checkout._id){
      dispatch(clearCart());
      localStorage.removeItem("cart")
    }else{
      navigate("my-orders");
    }
  },[checkout,dispatch,navigate])
  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank you for your order!
      </h1>

      {checkout && (
        <div className="p-6 rounded-lg border space-y-6">
          {/* Order Info and Estimated Delivery */}
          <div className="flex justify-between mb-10">
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Order ID:</span> {checkout._id}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Date:</span>{" "}
                {checkout.createdAt.toDateString()}
              </p>
            </div>
            <div>
              <p className="text-emerald-800 font-medium">
                Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>

          {/* Ordered Items */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Ordered Items:</h2>
            <div className="space-y-4">
              {checkout.checkoutItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 border p-4 rounded-md">
                  <img
  src={item.image.startsWith('http') ? item.image : `${import.meta.env.VITE_BACKEND_URL}${item.image}`}
  alt={item.name}
  className="w-20 h-20 object-cover rounded"
/>

                  <div>
                    <p className="font-semibold capitalize">{item.name}</p>
                    <p className="text-sm text-gray-600">Color: {item.color}</p>
                    <p className="text-sm text-gray-600">Size: {item.size.toUpperCase()}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment and Shipping Info */}
          <div className="grid grid-cols-2 gap-8">
            {/* Payment Method */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-700">PayPal</p>
            </div>

            {/* Shipping Address */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Address</h4>
              <p className="text-gray-700">{checkout.shippingAddres.address}</p>
              <p className="text-gray-700">
                {checkout.shippingAddres.city}, {checkout.shippingAddres.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
