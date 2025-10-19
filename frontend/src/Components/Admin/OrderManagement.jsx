import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrders, updateOrderStatus } from '../../../Redux/slice/adminorderSlice';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const {
    orders,
    loading,
    error,
    totalOrders,
    totalSales,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, user, navigate]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>Order Management</h2>
      <h3 className='text-lg font-semibold mb-1'>Total Orders: {totalOrders}</h3>
      <h4 className='text-md text-gray-600 mb-4'>Total Sales: ${totalSales.toFixed(2)}</h4>

      <div className='overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Order ID</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>User Name</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Total Price</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {orders?.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className='hover:bg-gray-100 transition duration-200 ease-in-out'>
                  <td className='px-6 py-4 whitespace-nowrap'>{order._id}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{order.user?.name || 'Unknown User'}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    ${typeof order.totalPrice === 'number' ? order.totalPrice.toFixed(2) : '0.00'}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 block p-2.5'
                    >
                      <option value='Pending'>Pending</option>
                      <option value='Processing'>Processing</option>
                      <option value='Shipped'>Shipped</option>
                      <option value='Delivered'>Delivered</option>
                      <option value='Cancelled'>Cancelled</option>
                    </select>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <button
                      onClick={() => handleStatusChange(order._id, 'Shipped')}
                      className='text-white bg-green-500 px-3 py-1 rounded hover:bg-green-600 mr-2'
                    >
                      Mark as Shipped
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='5' className='px-6 py-4 text-center text-gray-500'>
                  No orders available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
