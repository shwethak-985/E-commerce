import React from 'react';
import Hero from '../Components/Layout/Hero';
import GenderCollection from '../Components/products/genderCollection';
import Newarrivals from '../Components/products/Newarrivals';
import ProductsDetails from '../Components/products/productsDetails';
import ProductGrid from '../Components/products/ProductGrid';
import FeatureCollection from '../Components/products/featurecollection';  
import FeaturesSection from '../Components/products/featuresSection';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProductsByFilters } from '../../Redux/slice/productsSlice';
import axios from 'axios';



const Home = () => {
  const dispatch=useDispatch();
  const{products,loading,error}=useSelector((state)=>state.products);
  const [bestSellerProduct,setBestSellerProduct]=useState(null);

  useEffect(()=>{
    dispatch(fetchProductsByFilters({
      gender:"Women",
      category:"Bottom Wear",
      limit:8,
    })
  );
  const fetchBestSeller=async()=>{
    try {
      const response=await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
      );
      setBestSellerProduct(response.data);
      
    } catch (error) {
      console.log(error);
      
    }
  };
  fetchBestSeller();
  },[dispatch]);


  return (
    <div>
      <Hero />
      <GenderCollection />
      <Newarrivals />
      <h2 className='text-center font-bold mb-4 text-3xl'>
        Best Seller.
      </h2>
      {bestSellerProduct?( <ProductsDetails productId={bestSellerProduct._id}/>):(
        <p className='text-center'>
          Loading Bestseller product..
        </p>
      )}
     
      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4'>
          Bottom wear for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeatureCollection /> 
      <FeaturesSection/>
    </div>
  );
};

export default Home;
