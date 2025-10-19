import React from 'react';
import last from '../../assets/last.webp';

const FeatureCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
        {/* Left Side: Product Details */}
        <div className="lg:w-1/2 p-8">
          <div className="product">
            <h2>comfort and style</h2>
            <p>
              <span className="text-6xl font-bold text-gray-800">Feature Collection</span>
            </p>
            <p className="text-xl text-gray-600 mb-4">
              Shopping is not just about acquiring products, but it's an experience that combines convenience, excitement, and the joy of discovering something new. Whether online or in-store, express personal style, even indulge in something special.
            </p>
            <a
              href="#"
              className="inline-block px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Right Side: Random Images */}
        <div className="lg:w-1/2 p-8">
          <img
            src={last}
            alt="Feature Collection Image"
            className="w-full h-auto rounded-3xl shadow-lg mb-6"
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureCollection;
