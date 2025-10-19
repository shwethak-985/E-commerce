import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FiltersideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);
  

  const categories = ["Top wear", "Bottom wear"];
  const colors = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Beige", "Navy"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Wool", "Denim", "Polyester", "Silk", "Linen", "Viscose", "Fleece"];
  const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChicStyle"];
  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilter({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100,
    });
    setPriceRange([Number(params.minPrice) || 0, Number(params.maxPrice) || 100]);
  }, [searchParams]);

  const handleChange = (key, value) => {
    const updatedFilter = {
      ...filter,
      [key]: value,
    };
    setFilter(updatedFilter);

    const newParams = {
      ...Object.fromEntries([...searchParams]),
      [key]: Array.isArray(value) ? value.join(",") : value,
    };
    setSearchParams(newParams);
    
  };

  const handleArrayChange = (key, value) => {
    let updatedArray = [...filter[key]];
    if (updatedArray.includes(value)) {
      updatedArray = updatedArray.filter((item) => item !== value);
    } else {
      updatedArray.push(value);
    }
    handleChange(key, updatedArray);
  };

  const handlePriceChange = (e) => {
    const max = parseInt(e.target.value, 10);
    setPriceRange([0, max]);
    handleChange("maxPrice", max);
  };

  return (
    <aside className="w-full">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Gender */}
      <div className="mb-4">
        <label className="font-bold">Gender</label>
        <div className="mt-2">
          {genders.map((g) => (
            <div key={g} className="flex items-center mb-2">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={filter.gender === g}
                onChange={() => handleChange("gender", g)}
                className="mr-2 accent-blue-600"
              />
              <label>{g}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="font-bold">Category</label>
        <div className="mt-2">
          {categories.map((c) => (
            <div key={c} className="flex items-center mb-2">
              <input
                type="radio"
                name="category"
                value={c}
                checked={filter.category === c}
                onChange={() => handleChange("category", c)}
                className="mr-2 accent-blue-600"
              />
              <label>{c}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="mb-4">
        <label className="font-bold">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={c}
              name="color"
              style={{ backgroundColor: c.toLowerCase() }}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
                filter.color === c ? 'ring-2 ring-blue-600' : ''
              }`}
              onClick={() => handleChange("color", c)}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-4">
        <label className="font-bold">Size</label>
        <div className="mt-2">
          {sizes.map((s) => (
            <div key={s} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={filter.size.includes(s)}
                onChange={() => handleArrayChange("size", s)}
                className="mr-2 accent-blue-600"
              />
              <label>{s}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Material */}
      <div className="mb-4">
        <label className="font-bold">Material</label>
        <div className="mt-2">
          {materials.map((m) => (
            <div key={m} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={filter.material.includes(m)}
                onChange={() => handleArrayChange("material", m)}
                className="mr-2 accent-blue-600"
              />
              <label>{m}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="mb-4">
        <label className="font-bold">Brand</label>
        <div className="mt-2">
          {brands.map((b) => (
            <div key={b} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={filter.brand.includes(b)}
                onChange={() => handleArrayChange("brand", b)}
                className="mr-2 accent-blue-600"
              />
              <label>{b}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="font-bold"> Price Range</label>
        <input
          type="range"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full bg-gray-300 text-gray-600 h-2 mt-2 accent-blue-600"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </aside>
  );
};

export default FiltersideBar;
