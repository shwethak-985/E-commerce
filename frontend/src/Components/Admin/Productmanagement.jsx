import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { deleteProduct, fetchAdminProducts } from '../../../Redux/slice/adminProductSlice';


const Productmanagement = () => {
    const dispatch=useDispatch();
    const {products,loading,error}=useSelector(
        (state)=>state.adminProducts);
        useEffect(()=>{
            dispatch(fetchAdminProducts());

        },[dispatch])

        
const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {              
        dispatch(deleteProduct(productId));
    }
};
if(loading) return <p>Loading...</p>
if(error) return <p>error:{error}</p>
    
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-4'>Product Management</h2>

        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Product Name</th>
                        <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                        <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>SKU</th>
                        <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {products.length>0? products.map((product) => (
                        <tr key={product._id}
                            className='hover:bg-gray-100 transition duration-200 ease-in-out'>
                            <td className='px-6 py-4 whitespace-nowrap'>{product.name}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{product.price}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{product.sku}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                               <Link to={`/admin/products/${product._id}/edit`} className='text-white bg-yellow-500 px-2 py-1 hover:text-yellow-900'>Edit</Link>
                               <button onClick={()=>handleDelete(product._id)} className='text-white bg-red-500 px-2 py-1 hover:text-red-900 ml-2'>Delete</button>
                            </td>
                        </tr>
                    )):(
                        <tr>
                            <td colSpan="4" className='px-6 py-4 text-center'>No products available</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    </div>
  )
}

export default Productmanagement