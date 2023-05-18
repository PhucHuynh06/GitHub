import * as yup from 'yup';

// login validation
const LoginValidation = yup.object().shape({
  email: yup.string().email().required("Bạn Chưa Nhập Mail !").trim(),
  password: yup.string()
    .required("Bạn Chưa Nhập Mật Khẩu !")
    .min(6, "Mật khẩu phải ít nhất có 6 ký tự!")
    .max(20, "Mật khẩu không được dài quá 20 ký tự!")
    .matches(/^(?=.*[0-9]).+$/, "Mật khẩu phải chứa ít nhất một số!"),
});

// register validation
const RegisterValidation = yup.object().shape({
  email: yup.string().email().required("Email là bắt buộc!").trim(),
  password: yup.string()
    .required("Mật khẩu là bắt buộc!")
    .min(6, "Mật khẩu phải ít nhất có 6 ký tự!")
    .matches(/^(?=.*[0-9]).+$/, "Mật khẩu phải chứa ít nhất một số!"),
  fullName: yup.string().required("Họ và tên là bắt buộc!")
    .max(20, "Họ và tên dài nhất là 20 ký tự!")
    .matches(/^[a-zA-Z ]+$/, "Họ và tên chỉ được bao gồm các chữ cái và khoảng trắng!"),
});

const ProfileValidation = yup.object().shape({
  fullName: yup
    .string()
    .required("Họ và tên là bắt buộc!")
    .max(20, "Họ và tên dài nhất là 20 ký tự!")
    .matches(/^[a-zA-Z ]+$/, "Họ và tên chỉ được bao gồm các chữ cái và khoảng trắng!"),
  email: yup.string().email().required("Email là bắt buộc!").trim(),
});

const PasswordValidation = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Mật khẩu là bắt buộc!")
    .min(6, "Mật khẩu phải ít nhất có 6 ký tự!")
    .matches(/^(?=.*[0-9]).+$/, "Mật khẩu phải chứa ít nhất một số!"),
  newPassword: yup
    .string()
    .required("Mật khẩu là bắt buộc!")
    .min(6, "Mật khẩu phải ít nhất có 6 ký tự!")
    .matches(/^(?=.*[0-9]).+$/, "Mật khẩu phải chứa ít nhất một số!"),
  confirmPassword: yup
    .string()
    .required("Mật khẩu là bắt buộc!")
    .min(6, "Mật khẩu phải ít nhất có 6 ký tự!")
    .matches(/^(?=.*[0-9]).+$/, "Mật khẩu phải chứa ít nhất một số!")
    .oneOf([yup.ref("newPassword"), null],"Mật khẩu phải phù hợp !")
});



export { LoginValidation, RegisterValidation, ProfileValidation, 
  PasswordValidation,
 };
