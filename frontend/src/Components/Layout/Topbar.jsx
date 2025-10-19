

import React from 'react';

const Topbar = () => {
  return (
    <div className='bg-colors-primary text-white '>

      <div className='container mx-auto p-2 flex justify-between items-centre '>
        <div className='hidden md:flex'>
          <a href='#' className='text-white p-2'>
            <i className="ri-meta-line"></i>
          </a>

          <a href='#' className='text-white p-2'>
          <i class="ri-instagram-line"></i>
          </a>

          <a href='#' className='text-white p-2'>
          <i class="ri-twitter-line"></i>
          </a>

        </div>
        <div className='text-sm  text-center flex-grow '>
            <span className='text-white'>
                we ship wordwide-Fast and Flexible shipping.
            </span>
            </div>
            <div className='text-sm hidden md:flex'>
                <a href='tel:+34567890' className='  hover:text-grey-300'/>
                +91 9008155041
            </div>
       
      </div>
    </div>
  );
};

export default Topbar;
