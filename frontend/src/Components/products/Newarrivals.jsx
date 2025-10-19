import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Newarrivals = () => {
  const scroll = useRef(null);
  const [scrolLeft, setscrolleft] = useState(false);
  const [scrollright, setscrollright] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);

  const scrollLeft = () => {
    scroll.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scroll.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrival`);
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };
    fetchNewArrivals();
  }, []);

  const updateScrollButtons = () => {
    const container = scroll.current;
    if (!container) return;
    setscrolleft(container.scrollLeft > 0);
    setscrollright(container.scrollLeft + container.clientWidth < container.scrollWidth);
  };

  // Add event listener to update scroll button states on scroll
  useEffect(() => {
    const container = scroll.current;
    if (!container) return;

    container.addEventListener('scroll', updateScrollButtons);
    updateScrollButtons(); // initial check

    return () => container.removeEventListener('scroll', updateScrollButtons);
  }, []);

  return (
    <section>
      <div className='container mb-10 mx-auto text-center relative'>
        <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
        <p className='text-lg text-black mb-8'>
          Discover the latest styles of runway, freshly added to your wardrobe.
        </p>
        {/* Scroll buttons */}
        <div className='absolute right-0 bottom-[-30px] flex space-x-2'>
          <button
            onClick={scrollLeft}
            disabled={!scrolLeft}
            className={`p-2 rounded border ${scrolLeft ? "bg-black text-white" : "bg-gray-400"}`}
          >
            <i className="ri-arrow-left-double-line"></i>
          </button>
          <button
            onClick={scrollRight}
            disabled={!scrollright}
            className={`p-2 rounded border ${scrollright ? "bg-black text-white" : "bg-gray-400"}`}
          >
            <i className="ri-arrow-right-double-line"></i>
          </button>
        </div>
      </div>

      {/* Scrollable product images */}
      <div
        ref={scroll}
        className='container mx-auto overflow-x-auto flex space-x-6 px-4 pb-4 scrollbar-hide'
        style={{ scrollBehavior: 'smooth' }}
      >
        {newArrivals.map((product) => (
          <div key={product._id} className="min-w-[100%] relative lg:min-w-[30%] sm:min-w-[50%]">
            <Link to={`/product/${product._id}`}>
              <div className="w-full h-[300px] flex items-center justify-center bg-white rounded-xl shadow-md">
  <img
    src={product.images[0]?.url}
    alt={product.images[0]?.altText || product.name}
    className="max-h-full max-w-full object-contain"
  />
</div>


              
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Newarrivals;
