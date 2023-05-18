import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import Banner from '../Components/Home/Banner'
import TrendingMovies from '../Components/Home/TrendingMovies'
import Promo from '../Components/Home/Promo'
import TopRated from '../Components/Home/TopRated'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMoviesAction, getRandomMoviesAction, getTopRatedMovieAction } from '../Redux/Actions/MoviesActions'
import  toast from 'react-hot-toast'

function HomeScreen() {
  const  dispatch = useDispatch();
  const { isLoading:randomLoading, isError:randomError, movies: randomMovies } = useSelector(
    (state) => state.getRandomMovies
);
const { isLoading:topLoading, isError:topError, movies: topMovies } = useSelector(
  (state) => state.getTopRatedMovies
);
const { isLoading, isError, movies } = useSelector(
  (state) => state.getAllMovies
);

//useEffect
useEffect(() =>{
  dispatch(getRandomMoviesAction());
  dispatch(getAllMoviesAction({}));
  dispatch(getTopRatedMovieAction());
  if(isError || randomError || topError ){
    toast.error("Có lỗi xảy ra !");
  }
}, [dispatch, isError, randomError, topError]);

  return (
    <Layout>
        <div className='container m-auto min-h-screen px-2 mb-6'>
            <Banner movies={movies} isLoading={isLoading}/>
            <TrendingMovies movies={randomMovies} isLoading={randomLoading}/>
            <Promo/>
            <TopRated movies={topMovies} isLoading={topLoading}/>
        </div>
    </Layout>
  );
}

export default HomeScreen