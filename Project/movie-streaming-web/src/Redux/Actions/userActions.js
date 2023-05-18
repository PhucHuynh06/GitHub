import * as userConstants from "../Constants/userConstants.js";
import * as userApi from "../APIs/userServices.js";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../protection.js";



//login action
const loginAction = (datas) => async (dispatch) =>{
    try{
        dispatch({ type: userConstants.USER_LOGIN_REQUEST});
        const response = await userApi.loginService(datas);
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response});
    }catch(error){
        ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
    }
};

//regiser action
const registerAction = (datas) => async(dispatch) => {
    try{
        dispatch({ type: userConstants.USER_REGISTER_REQUEST});
        const responce = await userApi.registerService(datas);
        dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: responce});
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, playoad: responce});
    }catch(error){
        ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
    }
};

// logout action
const logoutAction = () =>(dispatch) =>{
    userApi.logoutService();
    dispatch({ type: userConstants.USER_LOGOUT});
    dispatch({ type: userConstants.USER_LOGIN_RESET});
    dispatch({ type: userConstants.USER_REGISTER_REST});
};

//update profile action
const updateProfileAction = (user) => async (dispatch, getState) =>{
    try{
        dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST});
        const responce = await userApi.updateProfileService(user, tokenProtection(getState));
        dispatch({
            type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
            payload: responce,
        });
        toast.success("Profile Updated !")
        dispatch({
            type: userConstants.USER_LOGIN_SUCCESS,
            payload: responce,
        });
    }catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
    }
};

// delete profile action
const deleteProfileAction = () => async (dispatch, getState) =>{
    try{
        dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST});
        await userApi.deleteProfileService(tokenProtection(getState));
        dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS});
        toast.success("Profile Deleted !");
        dispatch(logoutAction());
    }catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
        
    }
};

// change password action
const changePassworAction = (passwords) => async (dispatch, getState) =>{
    try{
        dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST});
        const responce = await userApi.changePasswordService(
            passwords,
            tokenProtection(getState)
        );
        dispatch({
            type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
            payload: responce,
        });
    }
    catch(error){
        ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
    }
};

// get all favorite movies action
const getFavoriteMoviesAction = () => async (dispatch, getState) =>{
    try{
        dispatch({ type: userConstants.GET_FAVORITE_MOVIES_REQUEST});
        const responce = await userApi.getFavoriteMovies(
            tokenProtection(getState)
        );
        dispatch({
            type: userConstants.GET_FAVORITE_MOVIES_SUCCESS,
            payload: responce,
        });
    }catch (error){
        ErrorsAction( error, dispatch, userConstants.GET_FAVORITE_MOVIES_FAIL);
    }
};

// detele all favorite movies action
const deleteFavoriteMoviesAction = () => async (dispatch, getState) =>{
    try{
        dispatch({ type: userConstants.DELETE_FAVORITE_MOVIES_REQUEST});
            await userApi.deleteFavoriteMovies(
            tokenProtection(getState)
        );
        dispatch({
            type: userConstants.DELETE_FAVORITE_MOVIES_SUCCESS,
        });
        toast.success("Danh Sách Phim Đã Xoá !");
    }catch(error){
        ErrorsAction(error, dispatch, userConstants.DELETE_FAVORITE_MOVIES_FAIL);
    }
};

//admin get all users action
const getAllUsersAction = () => async (dispatch, getState) =>{
    try{
        dispatch({ type: userConstants.GET_ALL_USERS_REQUEST});
        const responce = await userApi.getAllUserService(tokenProtection(getState));
        dispatch({
            type: userConstants.GET_ALL_USERS_SUCCESS,
            payload: responce,
        });
    } catch(error){
        ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
    }
};

//admin delete user action
const deleteUserAction = (id) => async (dispatch, getState) =>{
    try{
        dispatch({ type: userConstants.DELETE_USER_REQUEST});
        await userApi.deleteUserService(id, tokenProtection(getState));
        dispatch({
            type: userConstants.DELETE_USER_SUCCESS,
        });
        toast.success("Xoá Người Dùng");
    }catch(error){
        ErrorsAction(error, dispatch, userConstants.DELETE_USER_FAIL);
    }
};

//user like movie action
const likeMovieAction = (movieId) => async (dispatch, getState) => {
    try {
      dispatch({ type: userConstants.LIKE_MOVIE_REQUEST });
      const responce = await userApi.likeMovieService(
        movieId,
        tokenProtection(getState)
      );
    
      dispatch({
        type: userConstants.LIKE_MOVIE_SUCCESS,
        payload: responce,
      });
        toast.success('Đã thêm vào danh sách của bạn');
        dispatch(getFavoriteMoviesAction());
    } catch (error) {
      ErrorsAction(error, dispatch, userConstants.LIKE_MOVIE_FAIL);
    }
  };


export{ loginAction, registerAction, logoutAction, updateProfileAction, 
    deleteProfileAction, changePassworAction, getFavoriteMoviesAction, 
    deleteFavoriteMoviesAction,getAllUsersAction,deleteUserAction,
    likeMovieAction,
};