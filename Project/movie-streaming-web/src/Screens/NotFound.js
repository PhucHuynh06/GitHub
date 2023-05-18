import React from 'react'
import { BiHomeAlt, BiMovie } from 'react-icons/bi'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='flex-colo gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6'>
      <img
        className='w-full h-96 object-contain'
        src='/logo192.png'
        alt='notfound'/>
      <h1 className='lg:text-4xl font-bold'>
        Page Not Found
      </h1>
      <p className='font-medium text-border italic leading-6'>
        The page you are looking for doesnt exist
      </p>
      <span className='flex items-center gap-4'>
        <Link to='/' className='bg-subMain text-white flex items-center transitions gap-4 font-medium py-2 px-6 hover:text-main rounded-md'>
          <BiHomeAlt/> Go Back To Home Page
        </Link>
        <Link to='/movies' className='bg-star text-black flex items-center transitions gap-4 font-medium py-2 px-6 hover:text-white rounded-md'>
          <BiMovie/> Go Back To Movie Page
        </Link>
      </span>
      
    </div>
  )
}

export default NotFound