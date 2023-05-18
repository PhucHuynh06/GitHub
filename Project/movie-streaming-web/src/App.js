import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import About from './Screens/About';
import HomeScreen from './Screens/HomeScreen';
import NotFound from './Screens/NotFound';
import Contact from './Screens/Contact';
import Movies from './Screens/Movies';
import SingleMovie from './Screens/SingleMovie';
import WatchPage from './Screens/WatchPage';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Profile from './Screens/Dashboard/Profile';
import Aos from 'aos';
import Password from './Screens/Dashboard/Password';
import FavoriteMovies from './Screens/Dashboard/FavoriteMovies';
import MovieList from './Screens/Dashboard/Admin/MovieList';
import Dashboard from './Screens/Dashboard/Admin/Dashboard';
import Categories from './Screens/Dashboard/Admin/Categories';
import User from './Screens/Dashboard/Admin/User';
import AddMovie from './Screens/Dashboard/Admin/AddMovie';
import { AdminProtectedRouter, ProtectedRouter } from './ProtectedRouter';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesAction } from './Redux/Actions/CategoriesActions';
import { getAllMoviesAction } from './Redux/Actions/MoviesActions';
import { getFavoriteMoviesAction } from './Redux/Actions/userActions';
import { toast } from 'react-hot-toast';



function App() {
  Aos.init();
  const dispatch = useDispatch()
  const {userInfo} = useSelector((state) => state.userLogin);
  const {isError, isSucces } = useSelector((state) => state.userLikeMovie);
  const {isError: catError} = useSelector((state) => state.categoryGetAll);

  useEffect(()=> {
    dispatch(getAllCategoriesAction());
    dispatch(getAllMoviesAction({}));
    if(userInfo){
      dispatch(getFavoriteMoviesAction())
    }
    if(isError || catError){
      toast.error("Có Lỗi Xảy Ra, Hãy thử lại !");
      dispatch({type:"LIKE_MOVIE_RESET"});
    }
    if(isSucces){
      toast.success({type:"LIKE_MOVIE_RESET"});
    }

  }, [dispatch,userInfo, isError, catError, isSucces]);
  return (
    
        <Routes>
          {/* **** PUBLIC ROUTERS **** */}
          <Route path='/' element={<HomeScreen/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/movies' element={<Movies/>}/>
          <Route path='/movies/:search' element={<Movies/>}/>
          <Route path='/movie/:id' element={<SingleMovie/>}/>
          <Route path='/watch/:id' element={<WatchPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='*' element={<NotFound/>}/>
          {/* **** PRIVATE PUBLIC ROUTERS **** */}
          <Route element={<ProtectedRouter />}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/password' element={<Password/>}/>
            <Route path='/favoritemovies' element={<FavoriteMovies/>}/>
            {/* **** ADMIN ROUTERS **** */}
            <Route element={<AdminProtectedRouter/>}>
              <Route path='/movielist' element={<MovieList/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/categories' element={<Categories/>}/>
              <Route path='/user' element={<User/>}/>
              <Route path='/addmovie' element={<AddMovie/>}/>
            </Route>
          </Route>
        </Routes>
        
     
  );
}

export default App