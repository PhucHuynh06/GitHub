import React from 'react'
import { useState} from 'react'
import Title from './../Title'
import { BsBookmarkStarFill, BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs'
import { Autoplay, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FaBookmark } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Rating from '../Star'
import Loader from '../Notfications/Loader'
import { Empty } from "../Notfications/Empty"
 

const SwiperTop=({prevEl,nextEl,movies}) =>{
  return (
    <Swiper 
          navigation={{nextEl, prevEl}}
          autoplay={true}
          speed={1000}
          loop={true}
          modules={[Navigation, Autoplay]}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            
        }}>
          {movies?.map((movie, index) => (
            <SwiperSlide key={index}>
              <div className='p-4 h-rate hovered border border-border bg-dry rounded-lg overflow-hidden'>
                <img
                  src={movie?.titleImage ? `/images/${movie.titleImage}` :"/images/user.png"}
                  alt={movie?.name}
                  className='w-full h-full object-cover rounded-lg'/>
                  <div className='px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0'>
                    <button className='w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white'>
                      <FaBookmark></FaBookmark>                    
                    </button>
                    <Link
                      className='font-semibold text-xl truncate line-clamp-2'
                      to={`/images/${movie?._id}`}>
                      {movie?.name}
                    </Link>
                    <div className='flex gap-2 text-star'>
                      <Rating value={movie?.rate}/>
                    </div>
                  </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
  )
}


function TopRated({movies, isLoading}) {
  const [nextEl, setNextEl] = useState(null)
  const [prevEl, setPrevEl] = useState(null)
  const classNames = 'hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white';
  return (
    <div className='my-16'>
      <Title title='Top Rated' Icon={BsBookmarkStarFill}/>
      <div className='mt-10'>
        {
          isLoading ? <Loader/> :
          movies?.length > 0 ? <SwiperTop nextEl={nextEl} prevEl={prevEl} movies={movies}/>
          : <Empty message="Hiện Tại Không Có Phim này !"/>
        }
        <div className='w-full px-1 flex-rows gap-6 pt-12'>
            <span className='flex gap-6'>
              <button className={classNames} ref={(node) => setPrevEl(node)}>
                <BsCaretLeftFill/>            
              </button>
              <button className={classNames} ref={(node) => setNextEl(node)}>
                <BsCaretRightFill/>            
              </button>
            </span>
        </div>
      </div>
    </div>
  )
}

export default TopRated