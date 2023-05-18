import React, { useEffect, useState,useMemo} from "react";
import Layout from "../Layout/Layout";
import Filters from "../Components/Filter";
import Movie from "../Components/Movie";
import { useDispatch, useSelector } from "react-redux";
import  toast  from "react-hot-toast";
import Loader from "../Components/Notfications/Loader";
import {RiMovie2Line} from "react-icons/ri";
import {TbPlayerTrackPrev,TbPlayerTrackNext} from "react-icons/tb";
import { getAllMoviesAction } from "../Redux/Actions/MoviesActions";
import{languageData, RatesData, TimesData, YearData} from "../Data/FilterData.js";
import { useParams } from "react-router-dom";


function MovieS() {
  const {search} =  useParams()
  const dispatch = useDispatch();
  const [category, setCategory] = useState({ title: "Tất cả thể loại" });
  const [year, setYear] = useState(YearData[0]);
  const [time, setTime] = useState(TimesData[0]);
  const [rate, setRater] = useState(RatesData[0]);
  const [language, setLanguage] = useState(languageData[0]);
  const sameClass ="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain"
  // all movies
  const { isLoading, isError, movies, pages , page } = useSelector(
    (state) => state.getAllMovies
  );

  //get all categories
  const {categories} = useSelector(
    (state) => state.categoryGetAll
  );


    //queries 
  const queries = useMemo(() =>{
    const query ={ 
    category: category?.title === "Tất cả thể loại" ? "" : category?.title,
    time: time?.title.replace(/\D/g,""),
    language: language?.title === "Ngôn ngữ" ? "" : language?.title,
    rate: rate?.title.replace(/\D/g,""),
    year: year?.title.replace(/\D/g,""),
    sreach: search ? search : "",

    };
    return query;
  },[category, time, language, rate, year, search]);

  //useEffect
  useEffect(() =>{
    //errors
    if(isError){
      toast.error(isError)
    }
    //get all movies
    dispatch(getAllMoviesAction(queries));
    
  }, [dispatch, isError, queries]);

  //pagination next and pages
  const nextPage = () =>{
    dispatch(getAllMoviesAction({
      pageNumber: page +1
    }));
  };
  const prevPage = () =>{
    dispatch(getAllMoviesAction({
      pageNumber: page -1
    }));
  };

  const datas = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    language: language,
    setLanguage: setLanguage,
    rate: rate,
    setRater: setRater,
    time: time,
    setTime: setTime,
    year: year,
    setYear: setYear,
  };

  


  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 py-6">
        <Filters data={datas} />
        <p className="text-lg font-medium my-6">
          Total {" "}
          <span className="font-bold text-subMain">
            {movies ?movies?.length :0}
            </span>{" "}
          items Found {
            search && `for"${search}"`
          }
        </p>
        {
          isLoading ? (
            <div className="w-full gap-6 flex-colo min-h-screen">
              <Loader/>
            </div>
          )
          :
          movies?.length > 0 ? (
              <>
                  <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
          {movies.map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </div>
        {/* Prev, next */}
        <div className="w-full flex flex-row justify-center gap-4 md:my-20 my-10">
            <button onClick={prevPage} disabled={page === 1} 
            className={sameClass}>
              <TbPlayerTrackPrev className="text-xl"></TbPlayerTrackPrev>
            </button>
            <button onClick={nextPage} disabled={page === pages} 
            className={sameClass}>
              <TbPlayerTrackNext className="text-xl"></TbPlayerTrackNext>
            </button>
        </div>
              </>
          ):
          (
            <div className="w-full gap-6 flex-colo min-h-screen">
              <div className="w-24 h-24 p-5 rounded-full mb-4 bg-main text-subMain text-4xl flex-colo">
                <RiMovie2Line/>
              </div>
              <p className="text-border text-sm">
                  Hiện Chưa Có Bộ Phim Nào
              </p>
            </div>
          )}
      </div>
    </Layout>
  );
}

export default MovieS;
