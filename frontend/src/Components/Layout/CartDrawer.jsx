import React from 'react';
import Cartcontent from '../cart/Cartcontent';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartDrawer = ({ draweropen, handlecartdrawer }) => {
  const navigate=useNavigate();
  const{user,guestId}=useSelector((state)=>state.auth);
  const{cart}=useSelector((state)=>state.cart);
  const userId=user ? user._id:null;

  const handlecheckout=()=>{
    handlecartdrawer();
    if(!user){
       navigate("/login?redirect=checkout")

    }else{
       navigate("/checkout");    }
   
   
    

  }
  return (
    <div
      className={`fixed top-0 right-0 sm:w-1/2 md:w-[30rem] w-3/4 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        draweropen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 flex justify-end">
        <button onClick={handlecartdrawer} aria-label="Close cart">
          <i className="ri-close-line"></i>
        </button>
      </div>

      {/* cart content */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-lg font-medium align-top">Your Cart</h2>
        {cart && cart?.products?.length>0?(<Cartcontent cart={cart} userId={userId} guestId={guestId}/>):(<p>your cart is empty</p>)}
        
      </div>

      {/* checkout */}
      <div className="p-4">
        {cart && cart?.products?.length>0 && (
          <>
          <button 
        onClick={handlecheckout}
        className="text-white bg-black w-full py-2 hover:bg-gray-600 transition">
          Checkout
        </button>
        <p className="text-sm font-normal text-center mt-2">
          Shipping, taxes, and discounts are calculated at checkout.
        </p>
          </>
        )}

        
      </div>
    </div>
  );
};

export default CartDrawer;
