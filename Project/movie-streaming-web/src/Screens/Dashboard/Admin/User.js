import React, { useEffect } from 'react'
import SideBar from '../SideBar'
import MovieTable2 from '../../../Components/MovieTable2'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAction, getAllUsersAction } from '../../../Redux/Actions/userActions'
import { toast } from 'react-hot-toast'
import { FiLoader } from 'react-icons/fi'
import { Empty } from '../../../Components/Notfications/Empty'



function User() {

  const dispatch = useDispatch()

  const {isLoading, isError, users} = useSelector((state) => 
  state.adminGetAllUsers);

  //delete
  const { isError:deleteError ,isSuccess} = 
  useSelector((state) => 
  state.adminDeleteUser);

  //delete user handler
  const deleteMoviesHandler = (id) =>{
    if(window.confirm("Bạn có muốn xoá người dùng này ?")){
      dispatch(deleteUserAction(id));
    }
  };

  // useEffect
  useEffect(() =>{
    dispatch(getAllUsersAction());
    if(isError || deleteError){
      toast.error(isError || deleteError);
      dispatch({ type: isError 
        ? "GET_ALL_USERS_RESET" 
        : "DELETE_USER_RESET",
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);

  return (
    <SideBar>
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-bold'>User List</h2>
            {
              isLoading?(
                <FiLoader />) : users.length > 0 ? 
                <MovieTable2 data={users} users={true} OnDeleteFunction= {deleteMoviesHandler} /> : (
                <Empty message="Hiện tại không có người dùng nào"/>
              
            )}
        </div>
    </SideBar>
  )
}

export default User