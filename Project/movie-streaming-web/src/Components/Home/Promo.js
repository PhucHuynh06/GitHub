import React from 'react'
import { FiUser } from 'react-icons/fi'

function Promo() {
  const hover = 'hover:text-dryGray transitions';
  return (
    <div className='my-20 py-10 md:px-20 px-8 bg-dry'>
      <div className='lg:grid lg:grid-cols-2 lg:gap-10 items-center'>
        <div className='flex lg:gap-10 gap-6 flex-col'>
          <h1 className='xl:text-3xl text-xl capitalize font-sans font-medium xl:leading-relaxed'>
            Download Movies On  Your Mobile Phone & Watch Offline
          </h1>
          <p className='text-text text-sm xl:text-base leading-6 xl:leading-8'>
            With our movie streaming website, you can now download your favorite movies directly to your mobile phone and watch them offline, wherever and whenever you want. 
            Our website offers a seamless and user-friendly experience, allowing you to quickly and easily find the movies you want to download. 
            You can choose from a variety of video qualities to suit your device and storage capacity, ensuring that you get the best possible viewing experience. 
            So whether you're on a long flight or a road trip, you can sit back, relax, and enjoy your favorite movies without any buffering or internet connection issues. 
            With our download feature, movie night just got a whole lot more convenient.
          </p>
          <div className='flex gap-4 md:text-lg text-sm'>
            <div className='flex gap-4 bg-black text-subMain px-6 py-3 rounded font-bold'>
              <button className={hover}>
                Download App
              </button>
            </div>
            <div className='flex items-center gap-4 bg-black text-subMain px-6 py-3 rounded font-bold'>
              <FiUser/> 14.4 M+
            </div>
          </div>
        </div>
        <div>
          <img 
            src='/images/mobile.png' 
            alt='Mobile App'
            className='w-full object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default Promo