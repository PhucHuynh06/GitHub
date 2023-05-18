import React, { useEffect } from 'react';
import SideBar from './SideBar';
import MovieTable from '../../Components/MovieTable';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavoriteMoviesAction, getFavoriteMoviesAction } from '../../Redux/Actions/userActions';
import toast from "react-hot-toast";
import { FiLoader } from 'react-icons/fi';
import { Empty } from '../../Components/Notfications/Empty';


function FavoriteMovies() {
  const dispatch = useDispatch()

  const {isLoading,isError,likedMovies} = useSelector((state) => 
  state.userGetFavoriteMovies);

  //delete
  const {isLoading:deleteLoading ,isError:deleteError ,isSuccess} = useSelector((state) => 
  state.userDeleteFavoriteMovies);

  //delete movie handler
  const deleteMoviesHandler = () =>{
    window.confirm("Bạn có muốn xoá tất cả phim ?") &&
    dispatch(deleteFavoriteMoviesAction());
  };

  // useEffect
  useEffect(() =>{
    dispatch(getFavoriteMoviesAction());
    if(isError || deleteError){
      toast.error(isError || deleteError);
      dispatch({ type: isError 
        ? "GET_FAVORITE_MOVIES_RESET" 
        : "DELETE_FAVORITE_MOVIES_RESET",
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);


  return (
    <SideBar>
        <div className='flex flex-col gap-6'>
            <div className='flex-btn gap-2'>
                <h2 className='text-xl font-bold'>Favorite Movies</h2>
                {
                  likedMovies?.length > 0 && 
                  <button
                  disabled={deleteLoading}
                  onClick={deleteMoviesHandler} 
                  className="bg-subMain transitions hover:bg-main flex items-center gap-4 text-white p-4 rounded-lg">
                  {deleteLoading ? "Deleting..." : "Xoá Tất Cả"}
                </button>
                }
                
            </div>
            {
              isLoading?(
                <FiLoader />) : likedMovies.length > 0 ? (<MovieTable data={likedMovies} admin={false} />) : (
                <Empty message="Danh Sách Phim Trống"/>
              
            )}
        </div>
    </SideBar>
  )
}

export default FavoriteMovies