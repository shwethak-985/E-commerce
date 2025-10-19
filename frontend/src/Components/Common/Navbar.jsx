import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import CartDrawer from "../Layout/CartDrawer"
import { useSelector } from 'react-redux'

const Navbar = () => {
  const [draweropen, setdraweropen] = useState(false)
  const [menuopen, setmenuopen] = useState(false)
  const {cart}=useSelector((state)=>state.cart);
  const {user}=useSelector((state)=>state.auth);
  const cartItemCount=cart?.products?.reduce((total,product)=>total+product.quantity,0)||0;

  const handlemenuopen = () => {
    setmenuopen(!menuopen)
  }

  const handlecartdrawer = () => {
    setdraweropen(!draweropen)
  }

  return (
    <>
      <nav className='container mx-auto flex items-center p-2 justify-between'>
        <div>
          <Link to="/" className='font-extrabold text-lg p-2'>
            FASSION ERA.
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex'>
          <Link to="/collection/all?gender=Men" className='text-gray-600 hover:text-black p-4'>
            Mens
          </Link>
          <Link to="/collection/all?gender=Women" className='text-gray-600 hover:text-black p-4'>
            Women
          </Link>
          <Link to="/collection/all?category=Top+Wear" className='text-gray-600 hover:text-black p-4'>
            Top wear
          </Link>
          <Link to="/collection/all?category=Bottom+Wear" className='text-gray-600 hover:text-black p-4'>
            Bottom wear
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {user && user.role==="admin" && (<Link to="/admin" className='bg-black text-white px-3 py-1 rounded hover:bg-gray-800'>
            Admin
          </Link>)}
          
          <Link to="/profile" className="p-3 hover:text-colors-primary relative">
            <i className="ri-user-line text-xl"></i>
          </Link>

          <div className='overflow-hidden'>
            <Search />
          </div>

          <button onClick={handlecartdrawer} className='hover:text-colors-primary relative p-3'>
            <i className="ri-shopping-cart-fill"></i>
            {cartItemCount>0 &&( <span className='text-sm px-1.5 text-white rounded-full bg-colors-primary absolute -top-0 -right-0'>
              {cartItemCount}
            </span>)}
           
          </button>

          <button onClick={handlemenuopen}>
            <i className="ri-menu-3-fill text-xl"></i>
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer draweropen={draweropen} handlecartdrawer={handlecartdrawer} />

      {/* Mobile Sidebar Menu */}
      <div
        className={`left-0 fixed top-0 sm:w-1/2 md:w-[30rem] w-3/4 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 
        ${menuopen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className='flex justify-end p-4'>
          <button onClick={handlemenuopen}>
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className='px-6'>
          <h2 className='text-2xl font-semibold text-gray-700 mb-6'>Menu</h2>

          <Link to="/" className='text-lg text-gray-800 font-bold mb-6 block' onClick={handlemenuopen}>
            FASSION ERA.
          </Link>

          <div className='flex flex-col space-y-4'>
            <Link to="/collection/all?gender=Men" onClick={handlemenuopen} className='text-gray-700 hover:text-black'>
              Mens
            </Link>
            <Link to="/collection/all?gender=Women" onClick={handlemenuopen} className='text-gray-700 hover:text-black'>
              Women
            </Link>
            <Link to="/collection/all?category=Top+wear" onClick={handlemenuopen} className='text-gray-700 hover:text-black'>
              Top wear
            </Link>
            <Link to="/collection/all?category=Bottom+wear" onClick={handlemenuopen} className='text-gray-700 hover:text-black'>
              Bottom wear
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
