import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchOrderDetails } from '../../Redux/slice/orderSlice';

const OrderDetailsPage = () => {
  const { id } = useParams();


 const dispatch=useDispatch();
 const {orderDetails,loading,error}=useSelector((state)=>state.orders);
 useEffect(()=>{
  dispatch(fetchOrderDetails(id));
 },[dispatch,id]);
 if(loading) return <p>loading..</p>
 if(error) return <p>error:{error}</p>
  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
      <h2 className='text-2xl md:text-3xl font-bold mb-6'>
        Order Details
      </h2>

      {!orderDetails ? (
        <p>No Order detail found</p>
      ) : (
        <div className='p-4 sm:p-6 rounded-lg border'>
          {/* Order Info & Status Badges */}
          <div className='flex flex-col sm:flex-row justify-between mb-8'>
            <div>
              <h3 className='text-lg md:text-xl font-semibold'>
                Order Id: #{orderDetails._id}
              </h3>
              <p className='text-gray-700'>
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className='flex flex-col sm:items-end items-start mt-4 sm:mt-0'>
              <span className={`text-sm font-semibold ${orderDetails.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-600 text-white'} px-3 py-1 rounded-full font-medium mb-2`}>
                {orderDetails.isPaid ? 'Paid' : 'Not Paid'}
              </span>
              <span className={`text-sm font-semibold ${orderDetails.isDelivered ? 'bg-green-100 text-green-700' : 'bg-red-600 text-white'} px-3 py-1 rounded-full font-medium`}>
                {orderDetails.isDelivered ? 'Delivered' : 'Not Delivered'}
              </span>
            </div>
          </div>

          {/* Payment & Shipping Info */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8'>
            <div>
              <h4 className='text-lg font-semibold mb-2'>Payment Info</h4>
              <p className='text-gray-700'>Method: {orderDetails.paymentMethod}</p>
              <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-2'>Shipping Info</h4>
              <p className='text-gray-700'>Method: {orderDetails.shippingMethod}</p>
              <p>Address: {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}</p>
            </div>
          </div>

          {/* Ordered Items Table */}
          <div className='overflow-x-auto mb-10'>
            <h4 className='text-lg font-semibold mb-2'>Ordered Items</h4>
            <table className='min-w-full bg-white border border-gray-300'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='px-4 py-2 border-b text-left'>Product</th>
                  <th className='px-4 py-2 border-b text-left'>Price</th>
                  <th className='px-4 py-2 border-b text-left'>Quantity</th>
                  <th className='px-4 py-2 border-b text-left'>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId} className='hover:bg-gray-50'>
                    <td className='px-4 py-2 border-b flex items-center'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='w-12 h-12 object-cover rounded mr-4'
                      />
                      <Link to={`/product/${item.productId}`} className='text-blue-600 hover:underline'>
                        <span className='font-semibold'>{item.name}</span>
                        </Link>
                      
                    </td>
                    <td className='px-4 py-2 border-b'>${item.price.toFixed(2)}</td>
                    <td className='px-4 py-2 border-b'>{item.quantity}</td>
                    <td className='px-4 py-2 border-b'>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/myorders" className='text-blue-600 hover:underline'>
  <button className='bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300'>
    Back to Orders
  </button>
</Link>

        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
