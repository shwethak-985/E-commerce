import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='border-t py-12'>
      <div className='container mx-auto grid grid-cols-1 gap-8 px-4 lg:px-0 md:grid-cols-4'>
        <div>
          <h3 className='text font-medium p-2'>Newsletter</h3>
          <p className='font-normal p-2'>
            Be the first to hear about new exclusive products and offers.
          </p>
          <p className='font-medium p-2'>
            Sign up and get 20% off on your first order.
          </p>
          {/* Newsletter form */}
          <form className='flex'>
            <input
              type='email'
              placeholder='Enter your email'
              className='text-sm w-full border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all'
            />
            <button
              type='submit'
              className='bg-black text-white px-6 py-3 rounded-r-md hover:bg-gray-800 transition-all'
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* shop link */}
        <div>
            <h3 className=' mb-4 text-lg'>
                Shop
            </h3>
            <ul>
                <li>
                    <Link to="$" className='hover:text-gray-600 transition-colors p-2'>Boys Adda</Link>
                </li>
                <li>
                    <Link to="$" className='hover:text-gray-600 transition-colors p-2'> Girls combo</Link>
                </li>
               
                <li>
                    <Link to="$" className='hover:text-gray-600 transition-colors p-2'>Mens top wear </Link>
                </li>
                <li>
                    <Link to="$" className='hover:text-gray-600 transition-colors p-2'>Womens top wear</Link>
                </li>
            </ul>

        </div>

        {/* help */}

        <div>
            <h3 className=' mb-4 text-lg'>
                Support
            </h3>
            <ul>
                <li>
                    <Link to="$" className='hover:text-gray-600 transition-colors p-2'>Contact us</Link>
                </li>
                <li>
                    <Link to="$" className='hover:text-gray-600 transition-colors p-2'> About us</Link>
                </li>
                <li>
                    <Link to="$" className='hover:text-gray-600 transition-colors p-2'>FAQs</Link>
                </li>
                <li>
                    <Link to="$" className='hover:text-gray-600 transition-colors p-2'>Features </Link>
                </li>
                
            </ul>

        </div>
        <div>
            <h3>
                Follow us

            </h3>
            <div className='flex items-center space-x-2 mb-6 '>
                <a href="https://www.facebook.com" target="_blank" ret="noopener norefrrer" />
                <i className="ri-meta-line hover:text-gray-500"></i>

                <a href="https://www.facebook.com" target="_blank" ret="noopener norefrrer" />
                <i class="ri-instagram-line"></i>
                <a href="https://www.facebook.com" target="_blank" ret="noopener norefrrer" />
                <i class="ri-twitter-line"></i>
                
            </div>
            <p className='text-gray-600'>
                Call us
            </p>
            <i class="ri-phone-line p-2"></i>
            986754678367
        </div>
      </div>
      <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
        <p className='text-center text-gray-600'>
        <i class="ri-copyright-line"></i> 2025 ,All Right Reserved

        </p>
      

      </div>
    </footer>
  );
};

export default Footer;
