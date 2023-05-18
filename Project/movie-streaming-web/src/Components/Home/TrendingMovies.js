import React from 'react';
import Title from '../Title';
import { BsCollectionFill } from 'react-icons/bs';
import { Movies } from '../../Data/MoviesData';
import Movie from '../Movie';
import Loader  from "../Notfications/Loader";
import { Empty } from "../Notfications/Empty";


function TrendingMovies({isLoading, movies}) {
  return (
    <div className='my-16'>
      <Title title="Trending Movies" Icon={BsCollectionFill}>
        {
          isLoading ? <Loader/> : movies?.length > 0
          ? (
            <div className='grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                  {Movies.slice(0, 8).map((movie, index) => (
                  <Movie key={index} movie={movie}/>
        ))}
      </div>
          ) : (
            <div className='mt-6'>
              <Empty message="Hiện tại chưa có phim này !"></Empty>
            </div>
          )
        }
      </Title>
    </div>
  );
}
export default TrendingMovies