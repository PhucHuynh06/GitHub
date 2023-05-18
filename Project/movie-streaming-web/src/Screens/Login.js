import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import { Input } from '../Components/UseInput';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { LoginValidation } from "../Components/Validation/UserValidation.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from '../Components/Notfications/Error';
import { loginAction } from '../Redux/Actions/userActions.js';
import toast from "react-hot-toast";


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, userInfo, isSuccess } = useSelector(
        (state) => state.userLogin
    );

    // validate user
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginValidation),
    });

    // on submit
    const onSubmit = (data) => {
        dispatch(loginAction(data));
    };

    //useEffect
    useEffect(() =>{
        if(userInfo?.isAdmin){
            navigate("/dashboard");
        }
        else if(userInfo){
            navigate("/profile")
        }
        if(isSuccess){
            toast.success(`Chào Mừng quay lại ${userInfo?.fullName}`);
        }
    
        if(isError){
            toast.error(isError);
            dispatch({ type: "USER_REGISTER_RESET"});
        }
    }, [userInfo, isSuccess, isError, navigate, dispatch,setValue]);

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
                            label='Email:'
                            placeholder='Ex: T1thanhT2@gmail.com'
                            type='email'
                            name='email'
                            register={register("email")}
                            bg={true} >

                        </Input>
                        {errors.email && (<InlineError text={errors.email.message} />)}
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

                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className='bg-subMain transitions hover:bg-main flex items-center gap-4 text-white p-4 rounded-lg'
                    >
                        {
                            // Neu Loading hien thi ra
                            isLoading ?(
                                "Đang tải..."
                            ) : (
                                <>
                                    <FiLogIn /> Đăng Nhập
                                </>
                            )
                        }
                        
                    </button>
                    <p className='text-center text-border'>
                        Don't have an account yet? {" "}
                        <Link
                            to='/register'
                            className='text-dryGray font-semibold ml-2'>
                            Đăng Ký
                        </Link>
                    </p>
                </form>
            </div>
        </Layout>
    )
}

export default Login;
