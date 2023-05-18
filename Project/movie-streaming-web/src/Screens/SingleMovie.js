import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import { useParams } from 'react-router-dom';
import MovieInfo from '../Components/Single/MovieInfo';
import Actors from '../Components/Single/Actors';
import Ratings from '../Components/Single/Ratings';
import Title from '../Components/Title';
import { BsCollectionFill } from 'react-icons/bs';
import Movie from '../Components/Movie';
import LinkShareModel from '../Components/Models/LinkShareModel';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieByIdAction } from '../Redux/Actions/MoviesActions';
import Loader from '../Components/Notfications/Loader';
import { Ri24HoursLine } from 'react-icons/ri';

function SingleMovie() {
  const [modelOpen, setModelOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = "w-full gap-6 flex-colo min-h-screen";

  // useSelector
  const { isLoading, isError, movie } = useSelector((state) => state.getMovieById);
  const { movies } = useSelector((state) => state.getAllMovies);

  // Related movies
  const RelatedMovies = movies?.filter((m) => m.category === movie?.category);

  // useEffect
  useEffect(() => {
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <Ri24HoursLine />
          </div>
          <p className="text-border text-sm">Có lỗi Xảy ra !</p>
        </div>
      ) : (
        <>
          <LinkShareModel modelOpen={modelOpen} setModelOpen={setModelOpen} movie={movie} />
          <MovieInfo movie={movie} setModelOpen={setModelOpen} />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <Actors movie ={movie}/>
            {/* rate */}
            <Ratings movie={movie} />
            {/* related */}
            {
              RelatedMovies?.length > 0 && <div className="my-16">
              <Title title="Related Movies" Icon={BsCollectionFill} />
              <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                {RelatedMovies?.map((movie) => (
                  <Movie key={movie?._id} movie={movie} />
                ))}
              </div>
            </div>
            }
            
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleMovie;
