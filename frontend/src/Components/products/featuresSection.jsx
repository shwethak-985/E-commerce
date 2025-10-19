import React from 'react';

const FeaturesSection = () => {
  return (
    <div className="py-16 px-4 lg:px-0 bg-gray-100">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Free International Shipping Section */}
        <div className="flex items-center bg-white p-6 rounded-lg shadow-lg">
          <div className="mr-4 text-blue-500 text-3xl">
            <i className="fas fa-truck"></i>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Free International Shipping</h3>
            <p className="text-gray-600">On all orders over $10,000</p>
          </div>
        </div>

        {/* 45 Days Return Section */}
        <div className="flex items-center bg-white p-6 rounded-lg shadow-lg">
          <div className="mr-4 text-green-500 text-3xl">
            <i className="fas fa-sync-alt"></i>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">45 Days Return</h3>
            <p className="text-gray-600">Money back guarantee</p>
          </div>
        </div>

        {/* Secure Checkout Section */}
        <div className="flex items-center bg-white p-6 rounded-lg shadow-lg">
          <div className="mr-4 text-red-500 text-3xl">
            <i className="fas fa-lock"></i>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Secure Checkout</h3>
            <p className="text-gray-600">100% secured checkout process</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
