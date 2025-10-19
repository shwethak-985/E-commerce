import React from 'react'
import { FaStore, FaUser } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../../Redux/slice/authslice'
import { clearCart } from '../../../Redux/slice/cartSlice'

const adminSidebar = () => {
   
        const navigate=useNavigate()
        const dispatch=useDispatch()
        const handlelogout=()=>{
            dispatch(logout());
            dispatch(clearCart());
            navigate('/')
        }
  return (
    <div className='p-6 '>
        <div className='mb-6'>
            <Link to="/admin" className='text-2xl font-bold text-white'>
               Fassion Era
            </Link>

        </div>
        <h2 className='text-xl font-bold text-white mb-4'>Admin Dashboard</h2>
        <nav className='space-y-4 flex flex-col'>
            <NavLink to="/admin/users" className={({ isActive }) => (isActive ? 'text-white py-3 px-4 flex items-center space-x-2 bg-gray-700 p-2 rounded' :
                 'text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-3 flex items-center space-x-2 rounded')}>
                <FaUser/><span>Users</span>
            </NavLink>
            <NavLink to="/admin/products" className={({ isActive }) => (isActive ? 'text-white py-3 px-4 flex items-center space-x-2 bg-gray-700 p-2 rounded' :
                 'text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-3 flex items-center space-x-2 rounded')}>
                <i className="ri-shopping-bag-line"></i><span>Products</span>
            </NavLink>
            <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? 'text-white py-3 px-4 flex items-center space-x-2 bg-gray-700 p-2 rounded' :
                 'text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-3 flex items-center space-x-2 rounded')}>
                <i className="ri-shopping-cart-line"></i><span>Orders</span>
            </NavLink>
            <NavLink to="/admin/shop" className={({ isActive }) => (isActive ? 'text-white py-3 px-4 flex items-center space-x-2 bg-gray-700 p-2 rounded' :
                 'text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-3 flex items-center space-x-2 rounded')}>
                <FaStore/><span>Shop</span>
            </NavLink>
            
            <div className='flex items-center justify-between mt-6'>
                <button onClick={handlelogout} className='w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'>
                    Logout
                </button>

            </div>
            </nav>
    </div>
  )
}

export default adminSidebar