import {
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit';
import * as User from "./Reducers/userReducers.js";
import * as categories from "./Reducers/CategoriesReducers.js";
import * as movies from "./Reducers/MoviesReducers.js";


const rootReducer = combineReducers({
    //User reducers
    userLogin: User.userLoginReducer,
    userRegister: User.userRegisterReducer,
    userUpdateProfile: User.userUpdateProfileReducer,
    userDeleteProfile: User.userDeleteProfileReducer,
    userchangepassword: User.userChangePasswordReducer,
    userGetFavoriteMovies: User.userGetFavoriteMoviesReducer,
    userDeleteFavoriteMovies: User.userDeleteFavoriteMoviesReducer,
    adminGetAllUsers: User.adminGetAllUsersReducer,
    adminDeleteUser: User.adminDeleteUserReducer,
    userLikeMovie: User.userLikeMovieReducer,

    //Category reducers
    categoryGetAll: categories.getAllCategoriesReducer,
    categoryCreate: categories.createCategoriesReducer,
    categoryUpdate: categories.updateCategoriesReducer,
    categoryDelete: categories.deleteCategoriesReducer,

    //Movies reducers
    getAllMovies: movies.moviesListReducer,
    getRandomMovies: movies.moviesRandomReducer,
    getMovieById: movies.movieDetailsReducer,
    getTopRatedMovies: movies.movieTopRatedReducer,
    createReview: movies.createReviewReducer,
    


});

// Lay userInfo tu localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

//initialState
const initialState = {
    userLogin:{ userInfo: userInfoFromStorage},
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
});

