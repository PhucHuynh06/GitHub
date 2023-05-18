import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: [true, "Hãy Điền Đầy Đủ Họ Tên Của Bạn"],
    },
    email:{
        type: String,
        required: [true, "Hãy Điền Mail Của Bạn"],
        unique: true,
        trim: true,
    },
    password:{
        type:String,
        required: [true, "Hãy Điền Mật Khẩu Của Bạn"],
        minlength: [6,"Mật Khẩu Không Được Dưới 6 ký tự"],
    },
    image:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
    likedMovies:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Movie",
        },
    ],
    



},
{
    
    timestamps: true,
    
}
);
// them thu co remove dc khong
UserSchema.pre('remove', async function (next) {
    const user = this;
    await Movie.updateMany({ likes: user._id }, { $pull: { likes: user._id } });
    next();
  });

export default mongoose.model("User", UserSchema);