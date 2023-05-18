import toast  from "react-hot-toast";
import { useSelector } from "react-redux";
import { likeMovieAction } from "../Redux/Actions/userActions";

//Kiem tra neu phim da dc them vao danh sach
const IfMovieLiked = (movie) =>{
    const{likedMovies} = useSelector(state => state.userGetFavoriteMovies)
    return likedMovies?.find(likedMovie => likedMovie?._id === movie._id)
}

//like movie functionalty
const  LikeMovie = (movie, dispatch, userInfo) =>{
    return !userInfo
    ? toast.error("Hãy đăng nhập để có thể thêm vào danh sách phim ! ")
    : dispatch(
        likeMovieAction({
            movieId: movie._id,
        })
    );
};

export {IfMovieLiked, LikeMovie };



