import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/Auth.js";
// @desc Register user
// @route POST /api/users/register
//@access Public

const registerUser = asyncHandler(async (req, res) =>{
    const {fullName, email, password, image} = req.body
    try{
        const userExists = await User.findOne({email})
        // kiem tra neu nguoi dung co ton tai khong
        if (userExists){
            res.status(400)
            throw new Error("Đã Tồn Tại Người Dùng Này")
        }

        //mã băm
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Tao nguoi dung vao DB
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            image,
        });

        //nếu người dùng được tạo thành công, sẽ gửi dữ liệu kèm mã thông báo(token) cho khách
        if(user){
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error("Dữ Liệu Người Dùng Không Hợp Lệ");
        }
    
    }catch (error){
        res.status(400).json({ message: error.message });
    }
});

//@desc Login user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async(req, res) =>{
    const {email, password } = req.body;
    try{
        // Tim nguoi dung trong DB
        const user = await User.findOne({email});
        // Nếu tồn tại người dùng so sánh mật khẩu với mã băm sau đó gửi dữ liệu và mã cho clinet
        if(user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        }
        // người dùng hoặc mật khẩu không khớp sẽ báo lỗi 
        else{
            res.status(401);
            throw new Error("email và password không hợp lệ");
        }
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

//***Private Controllers ***

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async(req, res) =>{
    const { fullName, email, image } = req.body;
    try{
        //tim nguoi dung trong DB
        const user = await User.findById(req.user._id);
        //
        if(user) {
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.image = image || user.image;

            const updateUser = await user.save();
            //
            res.json({
                _id: updateUser._id,
                fullName: updateUser.fullName,
                email: updateUser.email,
                image: updateUser.image,
                isAdmin: updateUser.isAdmin,
                token: generateToken(updateUser._id),

            });
        }
        //
        else{
            res.status(404);
            throw new Error("Use not found");
        }
    } catch (error){
        res.status(400).json({ message: error.message});
    }
});

//@desc Delete user profile
//@route Delete /api/user
//@access Private
const deleteUserProfile = asyncHandler(async (req, res) => {
    //tim nguoi dung trong DB
    try {
      const user = await User.findById(req.user._id);
      if (user) {
        //Neu nguoi dung la admin khong the xoa khoi DB
        if (user.isAdmin) {
          res.status(400);
          throw new Error("Đây là quản trị không thể xoá !");
        }
        //Nguoc lai
        await User.deleteOne({_id: user._id});
        res.json({message:"Đã xoá thành công !"});
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
//@desc Change user password
//@route PUT /api/user/password
//@access Private
const changeUserPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body;
    try {
        //Tìm người dùng trong DB
        const user = await User.findById(req.user._id);
        
        if (user && (await bcrypt.compare(oldPassword, user.password))) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();
            res.json({message:"Mật khẩu đã thay đổi thành công !"});
        } else {
            res.status(401);
            throw new Error("Mật khẩu cũ không chính xác !");
        }
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
});

//@desc Get all liked movies
//@route GET /api/user/favorites
//@access Private
const getLikedMovies = asyncHandler(async(req, res)=>{
    try{
        //Tim nguoi dung trong DB
        const user = await User.findById(req.user._id).populate("likedMovies");
        // Neu nguoi dung liked
        if(user){
            res.json(user.likedMovies);
        }
        else{
            res.status(404);
            throw new Error("User not found");
        }
    }catch(error){
        res.status(400).json({message: error.message});
    }
});
//@desc Add Movie to liked movies
//@route POST /api/user/favorites
//@access Private
const addLikedMovie = asyncHandler(async(req, res) =>{
    const {movieId} = req.body;
    try{
        //Tim nguoi dung trong DB
        const user = await User.findById(req.user._id);
        //
        if(user){
            //
           
            if(user.likedMovies.includes(movieId)){
                res.status(400);
                throw new Error("Phim đã được lưu vào danh sách yêu thích !");
            }
            //
            user.likedMovies.push(movieId);
            await user.save();
            res.json(user.likedMovies);
        }
        //
        else{
            res.status(404);
            throw new Error("Movie not found");
        }
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

//@desc Delete all liked movies
//@route DELETE /api/user/favorites
//@access Private
const deleteLikedMovies = asyncHandler(async(req, res) => {
    try{
        //Tim Nguoi dung trong db
        const user = await User.findById(req.user._id);
        //
        if(user){
            user.likedMovies =[];
            await user.save();
            res.json({message:"Đã xoá danh sách phim của bạn !"});
        }
        else{
            res.status(404);
            throw new Error("User not found");
        }
    }catch (error){
        res.status(400).json({message: error.message});
    }
});

//***ADMIN CONTROLLERS ***/

//@desc Get all users
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async(req, res) =>{
    try{
        //Tim nguoi dung du lieu DB
        const users = await User.find({});
    res.json(users);
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

//@desc Delete users
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async(req, res) => {
    try{
        //Tìm người dùng trong DB
        const user = await User.findById(req.params.id);
        if(user){
            if(user.isAdmin){
                res.status(400);
                throw new Error("Không thể xóa người dùng admin !");
            }
            await User.deleteOne({ _id: req.params.id });
            res.json({message:"Đã xóa thành công !"})
        }
        else{
            res.status(404);
            throw new Error("User not found");
        }
    }catch(error){
        res.status(400).json({ message: error.message});
    }
});
export {registerUser, loginUser, updateUserProfile, deleteUserProfile,changeUserPassword,
    getLikedMovies,
    addLikedMovie,
    deleteLikedMovies,
    getUsers,
    deleteUser,};
