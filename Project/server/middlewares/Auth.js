import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../Models/UserModels.js";
//@desc Authenticated user & get token
const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: "30d",
    });
};

//protection middleware

const protect = asyncHandler(async(req, res, next) => {
    let token;
    //check if token exists in headers
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    )  {
        //set token to the value of the token in headers

        try{
            token = req.headers.authorization.split(" ")[1];
            //verify token and get user id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //get user id from decoded token
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch(error){
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    //if token doesn't exist in headers send error
    if(!token) {
        res.status(401);
        throw new Error("Not authorized, no token")
    }
});

//admin middleware
const admin = (req, res, next) =>{
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        res.status(401);
        throw new Error("Không Được Uỷ quyền làm Admin");
    }
}

//tokenFB

export { generateToken, protect, admin, };