import * as yup from "yup";

const ReviewValidation = yup.object().shape({
    comment: yup
    .string("")
    .required("Hãy Bình Luận !")
    .max(150, "Bình luận thường có khoảng 150 kí tự !"),
    rating: yup.number().required("Hãy chọn đánh giá"),
});

export{ReviewValidation, }