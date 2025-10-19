import React, { useEffect, useState, useRef } from 'react';
import { FaFilter } from "react-icons/fa";
import FiltersideBar from '../Components/products/FiltersideBar';
import SortOptions from '../Components/products/SortOptions';
import ProductGrid from '../Components/products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../../Redux/slice/productsSlice';

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const queryParams = Object.fromEntries([...searchParams]);
  const { gender, category } = queryParams;

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch products whenever filters (searchParams) or collection change
  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams.toString()]);

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Close sidebar when clicking outside
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row relative">
      {/* Mobile filter toggle button */}
      <button
        className="lg:hidden border p-2 flex justify-center items-center"
        onClick={toggleSidebar}
        aria-label="Toggle filters"
        aria-expanded={isSidebarOpen}
        aria-controls="filter-sidebar"
      >
        <FaFilter className="mr-2 text-black text-xl" />
        {isSidebarOpen ? 'Close Filter' : 'Filter'}
      </button>

      {/* Overlay for mobile filter sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar for filters */}
      <div
        id="filter-sidebar"
        ref={sidebarRef}
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white 
        overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FiltersideBar />
      </div>

      {/* Main product content */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase font-semibold mb-4">
          {collection} {gender ? ` - ${gender}` : ''} {category ? ` - ${category}` : ''}
        </h2>

        <SortOptions />

        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
