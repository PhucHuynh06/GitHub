import React, { useEffect } from 'react';
import SideBar from '../SideBar';
import { HiPlus } from 'react-icons/hi';
import MovieTable2 from '../../../Components/MovieTable2';
import CategoryModel from '../../../Components/Models/CategoryModel';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryAction, getAllCategoriesAction } from '../../../Redux/Actions/CategoriesActions.js';
import { FiLoader } from 'react-icons/fi';
import { Empty } from '../../../Components/Notfications/Empty';
import { toast } from 'react-hot-toast';



function Categories() {
    const [modelOpen, setModelOpen] = useState(false)
    const [category, setCategory] = useState()
    const dispatch = useDispatch()
    


    // all categories
    const{categories, isLoading} = useSelector(
        (state) => state.categoryGetAll
    );
    
    //delete category
    const { isSuccess, isError} = useSelector(
        (state) => state.categoryDelete
    )
    const adminDeletecategory = (id) =>{
        if(window.confirm("Bạn có chắc muốn xoá thể loại này ?")){
            dispatch(deleteCategoryAction(id));
        }
    };

    const OnEditFunction = (id) => {
        setCategory(id);
        setModelOpen(!modelOpen);
    }

    useEffect(() => {
        //get all categories
        dispatch(getAllCategoriesAction());

        if(isError){
            toast.error(isError)
            dispatch({
                type:"DELETE_CATEGORY_RESET",});
        }
        if(isSuccess){
            dispatch({
                type:"DELETE_CATEGORY_RESET",});
        }

        if(modelOpen === false) {
            setCategory()
        }
    }, [modelOpen, dispatch, isError,isSuccess]);
  return (
    <SideBar>
        <CategoryModel 
            modelOpen={modelOpen} 
            setModelOpen={setModelOpen} 
            category={category}></CategoryModel>
        <div className='flex flex-col gap-6'>
            <div className='flex-btn gap-2'>
                <h2 className='text-xl font-bold'>Thể Loại</h2>
                <button
                    onClick={() => setModelOpen(true)} 
                    className='bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded flex items-center gap-4'>
                        <HiPlus/>Tạo Mới
                </button>
            </div>

            {
              isLoading?(
                <FiLoader />
                ) : categories?.length > 0 ? (
                <MovieTable2 
                    data={categories}
                    users={false}
                    OnEditFunction={OnEditFunction}
                    OnDeleteFunction = {adminDeletecategory}
                >
                </MovieTable2>
                ) : (
                <Empty message="Danh Sách Đang Trống"/>
              
            )}
        </div>
    </SideBar>
  )
}

export default Categories