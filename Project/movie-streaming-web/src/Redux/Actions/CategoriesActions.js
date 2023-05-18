import * as CategoriesConstants from "../Constants/CategoriesConstants.js";
import * as categoriesAPIs from "../APIs/CategoriesServices.js";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../protection.js";


//Get all Categories action
const getAllCategoriesAction = () => async (dispatch) =>{
    try{
        dispatch({ type: CategoriesConstants.GET_ALL_CATEGORIES_REQUEST});
        const data = await categoriesAPIs.getAllCategoriesService();
        dispatch({ type: CategoriesConstants.GET_ALL_CATEGORIES_SUCCESS, payload: data});
    }catch(error){
        ErrorsAction(error, dispatch, CategoriesConstants.GET_ALL_CATEGORIES_FAIL);
    }
};

//Create Category action
const createCategoryAction = (title) => async(dispatch, getState) =>{
    try{
        dispatch({ type: CategoriesConstants.CREATE_CATEGORY_REQUEST});
        await categoriesAPIs.createCategoryService(
            title,
            tokenProtection(getState)
        );
        dispatch({ type: CategoriesConstants.CREATE_CATEGORY_SUCCESS});
        toast.success("Đã tạo thể loại thành công !");
        dispatch(getAllCategoriesAction());
    } catch(error){
        ErrorsAction(error, dispatch, CategoriesConstants.CREATE_CATEGORY_FAIL);
    }
};

//Update Category action
const updateCategoryAction = (id, title) => async(dispatch, getState) =>{
    try{
        dispatch ({ type: CategoriesConstants.UPDATE_CATEGORY_REQUEST});
    await categoriesAPIs.updateCategoryService(
        id,
        title,
        tokenProtection(getState)
    );
    dispatch({ type: CategoriesConstants.UPDATE_CATEGORY_SUCCESS});
    toast.success("Đã cập nhật thể loại thành công !");
    dispatch(getAllCategoriesAction());
    }catch(error){
        ErrorsAction(error, dispatch, CategoriesConstants.UPDATE_CATEGORY_FAIL);
    }
};

//Delete category action
const deleteCategoryAction = (id) => async (dispatch, getState) => {
    try{
        dispatch({ type: CategoriesConstants.DELETE_CATEGORY_REQUEST});
        await categoriesAPIs.deleteCategoryService(id, tokenProtection(getState));
        toast.success("Đã xoá thể loại thành công !");
    }catch(error){
        ErrorsAction(error, dispatch, CategoriesConstants.DELETE_CATEGORY_FAIL);
    }
};

export {
    getAllCategoriesAction,
    createCategoryAction,
    updateCategoryAction,
    deleteCategoryAction,

}
