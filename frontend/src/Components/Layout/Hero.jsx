import React from 'react'
import heroimg from '../../assets/hero.jpg'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
  <section className='relative'>
    <img src={heroimg} className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'/>
    <div className='absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center '>
        <div className='text-center text-white p-6'>
            <h1 className='font-semibold tracking-tighter md:text-lg mb-6'>
                we have a exclusive collection.

            </h1>
            <Link to="/collection/all" className='bg-white text-black px-6 py-3  rounded-sm text-lg'>
            Shop Now
            </Link>
        </div>
    </div>
  </section>
  )
}

export default Hero