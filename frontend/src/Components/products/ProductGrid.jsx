import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!Array.isArray(products) || products.length === 0)
    return <p>No products available.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        if (
          !product._id ||
          !product.name ||
          !product.price ||
          !product.images?.[0]?.url
        )
          return null;

        return (
          <Link key={product._id} to={`/product/${product._id}`} className="block">
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
              <div className="w-full h-96 mb-4">
                <img
                  src={product.images[0].url}
                  alt={product.images[0].altText || product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;
