import React, { useEffect, useState } from 'react'
import MainModels from './MainModels'
import { Input } from '../UseInput'
import { useDispatch, useSelector } from 'react-redux'
import { createCategoryAction, updateCategoryAction } from '../../Redux/Actions/CategoriesActions'
import { toast } from 'react-hot-toast'

function CategoryModel({modelOpen, setModelOpen, category}) {
    const [title, setTitle] = useState("")
    const dispatch = useDispatch()

    const {isLoading, isError, isSuccess} = useSelector((state) => state.categoryCreate)

    const {isLoading: upLoading , isError: upError, isSuccess: upSuccess } = useSelector((state) => 
    state.categoryUpdate)


    // category handler

const submitHandler = (e) =>{
    e.preventDefault()
    if(title){
        // Neu category trong thi cap nhat cateogory
        // con khong tao moi category
        if(category){
            dispatch(updateCategoryAction(category._id, {title: title}));
            //setModelOpen(!modelOpen)
        }
        else{
            dispatch(createCategoryAction({title: title}));
            setTitle("")
        }
    }
    else{
        toast.error("Hãy nhập tên thể loại !")
    }
};

//useEffect

useEffect(()=>{
    if(upError || isError){
        toast.error(upError || isError)
        dispatch({
            type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET"
        })
    }

    //success
    if(isSuccess || upSuccess){
        dispatch({
            type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET"
        })
    }

    //neu the loai khong null dat title den category title
    if(category){
        setTitle(category?.title)
    }
    
    if(modelOpen === false){
        setTitle("")
    }

    //
}, [dispatch, isError, isSuccess, upSuccess, upError, category, modelOpen]);


  return (
    <MainModels modelOpen={modelOpen} setModelOpen={setModelOpen}>
        <div className='inline-block sm:w-4/5 border border-border bg-main text-white rounded-2xl md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full'>
            <h2 className='text-3xl font-bold'>{category ? 'Update' : 'Create'}</h2>
            <form className='flex flex-col gap-6 text-left mt-6'
            onSubmit={submitHandler}
            >
                <Input 
                    label='Tên Thể Loại' 
                    placeholder={'Action'}
                    type='text'
                    bg={false}
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    >
                    </Input>
                <button
                    disabled={isLoading || upLoading}
                    type="submit"
                    className='w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain  rounded bg-subMain text-white'>
                    {
                        isLoading || upLoading 
                        ? "Loading...." 
                        : category 
                        ? "Cập Nhật" 
                        : "Tạo Mới"
                    }
                </button>
            </form>
        </div>
    </MainModels>
  )
}

export default CategoryModel