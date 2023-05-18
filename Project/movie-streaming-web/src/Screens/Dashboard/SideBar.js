import React from 'react'
import { BsFillGridFill } from 'react-icons/bs'
import { FaBookmark, FaListAlt, FaUser } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { HiViewGridAdd } from 'react-icons/hi'
import { RiLockPasswordLine, RiLogoutCircleLine, RiMovie2Fill } from 'react-icons/ri'
import Layout from '../../Layout/Layout'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from "../../Redux/Actions/userActions.js";
import  toast  from 'react-hot-toast';

function SideBar({children}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.userLogin);

    //logout
    const logoutHandler = () =>{
        dispatch(logoutAction());
        toast.success("Logged out successfully !");
        navigate("/login");
    }

    const SideLink = 
    userInfo?.isAdmin ?
    [
        {
            name:'Dashboard',
            link:'/dashboard',
            icon: BsFillGridFill
        },
        {
            name:'Movie List',
            link:'/movielist',
            icon: FaListAlt
        },
        {
            name:'Add Movie',
            link:'/addmovie',
            icon: RiMovie2Fill
        },
        {
            name:'Category List',
            link:'/categories',
            icon: HiViewGridAdd
        },
        {
            name:'Users',
            link:'/user',
            icon: FaUser
        },
        {
            name:'Update Profile',
            link:'/profile',
            icon: FiSettings
        },
        {
            name:'Favorite Movies',
            link:'/favoritemovies',
            icon: FaBookmark
        },
        {
            name:'Change Password',
            link:'/password',
            icon: RiLockPasswordLine
        },
    ]
    : userInfo ? [
        {
            name:'Update Profile',
            link:'/profile',
            icon: FiSettings
        },
        {
            name:'Favorite Movies',
            link:'/favoritemovies',
            icon: FaBookmark
        },
        {
            name:'Change Password',
            link:'/password',
            icon: RiLockPasswordLine
        },
    ]
    :[]
    ;
    const active = 'bg-dryGray text-subMain'
    const hover = 'hover:text-white hover:bg-main'
    const inActive = 'rounded font-medium text-sm transitions flex gap-3 items-center p-4';
    const Hover = ({isActive}) => 
        isActive ? `${active} ${inActive}` : `${inActive} ${hover}`

  return (
    <Layout>
        <div className='min-h-screen container mx-auto px-2'>
            <div className='xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6'>
                <div className='col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5'>
                    {SideLink.map((link, index) => (
                        <NavLink
                            to={link.link}
                            key={index}
                            className={Hover}>
                            <link.icon/> <p>{link.name}</p>
                        </NavLink>
                    ))}
                    <button onClick={logoutHandler} className={`${inActive} ${hover} w-full `}>
                        <RiLogoutCircleLine /> Log Out
                    </button>
                </div>
                <div
                    data-aos= 'face-up'
                    data-aos-duration= '1000'
                    data-aos-delay= '10'
                    data-aos-offset= '200'

                    className='col-span-6 rounded-md bg-dry border border-gray-800 p-6'>
                        {children}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default SideBar