import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import { Input } from '../Components/UseInput';
import { Link, useNavigate } from 'react-router-dom';
import { FiUserPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RegisterValidation } from "../Components/Validation/UserValidation.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from '../Components/Notfications/Error';
import { registerAction } from '../Redux/Actions/userActions.js';
import toast from "react-hot-toast";


function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, isSuccess } = useSelector(
        (state) => state.userRegister
    );

    // validate user
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(RegisterValidation),
    });

    // on submit
    const onSubmit = (data) => {
        dispatch(registerAction(data));
    };

    // useEffect
    useEffect(() => {
        if (isSuccess) {
          // Lưu trữ thông tin đăng nhập vào localStorage
          localStorage.setItem('accessToken', 'YOUR_ACCESS_TOKEN_HERE');
          // Hiển thị thông báo đăng ký thành công
          const notificationDiv = document.getElementById('notification');
          toast.success('Đăng ký tài khoản thành công. Hãy Đăng Nhập !!!.');
          if (notificationDiv) {
            notificationDiv.innerHTML = "<div class='alert alert-success'>Đăng ký tài khoản thành công. Tài khoản sẽ tự đăng nhập !!</div>";
          }
          // Chuyển hướng đến trang chính của ứng dụng
          navigate('/');
        }
        if (isError) {
          // Hiển thị thông báo lỗi
          const notificationDiv = document.getElementById('notification');
          if (notificationDiv) {
            notificationDiv.innerHTML = '<p>' + isError + '</p>';
          }
          dispatch({ type: 'USER_REGISTER_RESET' });
        }
      }, [isSuccess, isError, dispatch, navigate]);
      


    return (
        <Layout>
            <div className='container mx-auto px-2 my-24 flex-colo'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border'>
                    <img
                        src='/logo.png'
                        alt='logo'
                        className='w-full h-12 object-contain' 
                    />
                    <div className='w-full'>
                        <Input
                            label='Họ Và Tên:'
                            placeholder='Không viết dấu ví dụ: Nguyen Van A'
                            type='text'
                            name='fullName'
                            register={register("fullName")}
                            bg={true} >

                        </Input>
                        {errors.fullName && (<InlineError text={errors.fullName.message} />)}
                    </div>

                    <div className='w-full'>
                        <Input
                            label='Email:'
                            placeholder='Ex: T1thanhT2@gmail.com'
                            type='email'
                            name='email'
                            register={register("email")}
                            bg={true} >

                        </Input>
                        {errors.email && <InlineError text={errors.email.message} />}
                    </div>

                    <div className='w-full'>
                        <Input
                            label='Mật Khẩu:'
                            placeholder='**************'
                            type='password'
                            bg={true} 
                            name='password'
                            register={register("password")}
                        />
                        {errors.password && (<InlineError text={errors.password.message} />)}
                    </div>

                    <div className='w-full'>
                        <Input
                            label='Xác Nhận Lại Mật Khẩu:'
                            placeholder='**************'
                            type='password'
                            bg={true} 
                            name='confirmPassword'
                            register={register("confirmPassword")}
                        />
                        {errors.confirmPassword && (<InlineError text={errors.confirmPassword.message} />)}
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className='bg-subMain transitions hover:bg-main px-8 py-3 rounded-lg text-white font-bold flex items-center justify-center'>
                        {isLoading ? (
                            <svg
                                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'>
                                <circle
                                    className='opacity-25'
                                    cx='12'
                                    cy='12'
                                    r='10'
                                    stroke='currentColor'
                                    strokeWidth='4'></circle>
                                <path
                                    className='opacity-75'
                                    fill='currentColor'
                                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm4 8a8 8 0 018-8h4a12 12 0 00-12 12v-4zm8-8a8 8 0 01-8 8v4a12 12 0 0012-12h-4z'></path>
                            </svg>
                        ) : (
                            <>
                                <FiUserPlus className='text-xl mr-2' />
                                Đăng Ký
                            </>
                        )}
                    </button>
                    <p className='my-6'>
                        Nếu Bạn Đã Có Tài Khoản Hãy {' '}
                        <Link
                            to='/login'
                            className='font-semibold text-subMain hover:underline'>
                            Đăng Nhập
                        </Link>
                    </p>
                </form>
            </div>
        </Layout>
    );
}  
export default Register;