import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductsByFilters, setFilters } from '../../../Redux/slice/productsSlice';

const Search = () => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    dispatch(setFilters({ search }));
    dispatch(fetchProductsByFilters({ search }));
    navigate(`/collection/all?search=${encodeURIComponent(search)}`);
    setIsOpen(false);
  };

  return (
    <div className={`flex items-center justify-center transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white z-50 h-28" : "w-auto"}`}>
      {isOpen ? (
        <form onSubmit={handleSearch} className="w-full relative flex justify-center items-center">
          <div className="relative w-1/2">
            <input
              type="text"
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
              placeholder="Search here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 hover:text-colors-primary"
            >
              <i className="ri-search-line"></i>
            </button>
          </div>
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute top-1/2 right-10 -translate-y-1/2 text-gray-600 hover:text-colors-primary"
          >
            <i className="ri-close-line"></i>
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle} className="hover:text-colors-primary relative">
          <i className="ri-search-line"></i>
        </button>
      )}
    </div>
  );
};

export default Search;
