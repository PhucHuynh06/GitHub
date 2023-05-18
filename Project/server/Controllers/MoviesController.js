import { MoviesData } from "../Data/MoviesData.js";
import Movie from "../Models/MoviesModel.js";
import asyncHandler from "express-async-handler";
//*** PUBLIC CONTROLLERS ****/

//@desc import movies
//@route POST? api/movies/import
//@access Public
const importMovies = asyncHandler(async(req, res) =>{
    // Xac dinh table phim trong bang cach xoa tat ca tai lieu
    await Movie.deleteMany({});
    //sau do chen tat ca phim tu MoviesData
    const movies = await Movie.insertMany(MoviesData);
    res.status(201).json(movies);
});

//@desc get all movies
//@route GET /api/movies
//@access Public
const getMovies = asyncHandler(async(req, res) =>{
    try{
        // san loc phim theo category, time, language, .... va tim kiem
        const { category, time, language, rate, year, search } = req.query;
        let query = {
            ...(category && {category}),
            ...(time && {time}),
            ...(language &&{language}),
            ...(rate &&{rate}),
            ...(year &&{year}),
            ...(search &&{name: {$regex: search, $options: "i"}}),
        }

        //tai 

        const page = Number(req.query.pageNumber) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        // tim kiem phim theo query, bo qua va gioi han

        const movies = await Movie.find(query)
        //.sort({createdAt: -1})
        .skip(skip)
        .limit(limit);

        //tong so phim
        const count = await Movie.countDocuments(query);

        //phan hoi so phim va tong so phim 
        res.json({movies, page, pages: Math.ceil(count / limit), totalMovies:count });

    }catch(error){
        res.status(400).json({message: error.message});
    }
})



//desc get movie by id
//@route GET /api/movies/:id
//@access Public
const getMoviesById = asyncHandler(async (req, res) => {
    try{
        //tim phim theo id trong data
        const movie = await Movie.findById(req.params.id);
        // neu phim tim thay se gui thong bao toi may khach
        if(movie){
            res.json(movie);
        }

        //Con khong the se bao loi 404
        else{
            res.status(404);
            throw new Error("Không tìm thấy phim !");
        }
    }catch(error)
    {
        res.status(400).json({message: error.message});
    }
})

//@desc Get top rated movies
//@route GET /api/movies/rated/top
//@access Public
const getTopRatedMovies = asyncHandler(async (req, res) => {
    try {
      const { minRating } = req.query; // Lấy tham số minRating từ query
  
      // Xây dựng truy vấn
      const query = minRating
        ? { rate: { $gte: parseFloat(minRating) } }
        : {};
  
      // Tìm kiếm phim theo xếp hạng
      const movies = await Movie.find(query).sort({ rate: -1 });
  
      // Gửi thông tin xếp hạng phim đến máy khách
      res.json(movies);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


//@desc  Get random movie
//@route GET /api/movies/random/all
//@access Public
const getRandomMovies = asyncHandler(async(req, res) => {
    try{
        // Tim ngau nhien phim
        const movies = await Movie.aggregate([{ $sample: { size: 8 }}]);
        // gui den may khach
        res.json(movies);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//@desc Create movie review
//@route POST /api/movies/:id/reviews
//access Private
const createMovieReview = asyncHandler(async (req, res) =>{
    const { rating, comment } = req.body;
    try{
        //Tim movie theo id trong DB
        const movie = await Movie.findById(req.params.id);

        if(movie){
            // kiem tra neu nguoi dung nhan xet phim chua
            const alreadyReviewed = movie.reviews.find(
                (r) => r.userId.toString() === req.user._id.toString()
            );
            // neu roi bao loi 400
            if(alreadyReviewed){
                res.status(400);
                throw new Error("Bạn đã nhận xét bộ phim này !")
            }
            // chua thi tao nhan xet moi
            const review = {
                userName:req.user.fullName,
                userId: req.user._id,
                userImage: req.user.image,
                rating: Number(rating),
                comment,
            }
            //Day review moi vao mang review
            movie.reviews.push(review);
            //Tang so luong nhan xet
            movie.numberOfReviews = movie.reviews.length;

            //Tinh toan rate moi
            movie.rate = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length;

            // luu phim vao DB
            await movie.save();
            // gui lai cap nhap moi cua phim cho may khach
            res.status(201).json({message:"Đã thêm nhận xét !"});
        } else{
            res.status(404);
            throw new Error("Movie not found !");
        }
    }catch (error) {
        res.status(400).json({ message: error.message });
    }    
});

//*** ADMIN CONTROLLER ***/

//@desc Update movie
//@route PUT /api/movies/:id
//@access Provate/Admin
const updateMovie = asyncHandler(async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        res.status(404);
        throw new Error('Movie not found !');
      }
  
      const updates = Object.keys(req.body);
      updates.forEach((update) => {
        movie[update] = req.body[update] ?? movie[update];
      });
  
      const updatedMovie = await movie.save();
      res.status(201).json(updatedMovie);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


//@desc Delete moive
//@route DELETE /api/movie/:id
//@access Private/Admin
const deleteMovie = asyncHandler(async (req, res) => {
    try {
      // Tìm bộ phim cần xóa
      const movie = await Movie.findById(req.params.id);
  
      if (movie) {
        // Xóa bộ phim trong cơ sở dữ liệu
        await movie.deleteOne();
        res.json({ message: "Xóa bộ phim thành công!" });
      } else {
        res.status(404);
        throw new Error("Không tìm thấy bộ phim");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
//@desc Delete all movies
//@route DELETE /api/movies
//@access Private/Admin
const deleteAllMovies = asyncHandler(async (req, res) => {
    try {
      const deletedMovies = await Movie.deleteMany({});
      res.status(200).json({ message: `Đã xóa ${deletedMovies.deletedCount} phim.` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

const createMovie = asyncHandler(async(req, res) => {
    try{
        const {
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts,
          } = req.body;

        //Tạo mới một movie document
        const movie = new Movie({
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts,
            userId: req.user._id,
          });
      

        //Lưu movie vào DB
        if(movie){
            const createdMovie  = await movie.save();
            res.json(201).json(createdMovie);  // Khi thành công postman sẽ trả về 201.
        }
        //Báo lỗi không hợp lệ
        else{
            res.status(400);
            throw new Error("Dữ liệu không hợp lệ !");
        }

        //Gửi kết quả trả về cho client
        
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
});




export { importMovies, getMovies, getMoviesById, getTopRatedMovies, getRandomMovies,
    createMovieReview,updateMovie,deleteMovie,deleteAllMovies,createMovie,

    };