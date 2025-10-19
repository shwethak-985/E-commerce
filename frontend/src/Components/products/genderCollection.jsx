import React from 'react'
import femailcollection from '../../assets/female.jpg'
import malecollection from '../../assets/men.jpg'
import { Link } from 'react-router-dom'

const genderCollection = () => {
  return (
    <section className='p-5'>
        <div className='container mx-auto flex flex-col md:flex-row gap-8 '>
            <div className='relative flex-1'>
            <img src={femailcollection} className='w-full h-[700px] object-cover'/>
            <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
                <h2 className='text-2xl font-bold text-black mb-3'>
                    Womens collection
                </h2>
                <Link to="/collection/all?gender=Women" className='text-black underline'> 
                Shop Now
                </Link>
            </div>
            

            </div>

            <div className='relative flex-1'>
            <img src={malecollection} className='w-full h-[700px] object-cover'/>
            <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
                <h2 className='text-2xl font-bold text-black mb-3'>
                    Mens collection
                </h2>
                <Link to="/collection/all?gender=Men" className='text-black underline'> 
                Shop Now
                </Link>
            </div>
            

            </div>
            
            
        

        </div>
        
       
    </section>
    
    
  )
}

export default genderCollection