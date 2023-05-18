import Categories from "../Models/CategoriesModel.js";
import asyncHandler from "express-async-handler";


// *** PUBLIC CONTROLLERS ***
//@desc get all categories
//@route GET /api/categories
//@access Public

const getCategories = asyncHandler(async (req, res) =>{
    try{
        //Tim kiem tat ca the loai trong DB
        const categories = await Categories.find({});
        //Gui tat ca the loai cho may khach
        res.json(categories);
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

// *** ADMIN CONTROLLERS ***

//@desc create new category
//@route POST /api/categories
//@access Private/Admin
const creatCategory = asyncHandler (async (req, res) => {
    try{
        //Nhan tieu de tu noi dung yeu cau
        const { title } = req.body;
        //Tao the loai moi
        const category = new Categories({
            title,
        });
        // luu the loai vao DB
        const createdCategory = await category.save();
        //Gui the loai moi cho may khach
        res.status(201).json(createdCategory);
    }catch(error){
        res.status(400).json({ message: error.message});
    }
});


//@desc update category
//@route PUT /api/categories/:id
//@access Private/Admin
const updateCategory = asyncHandler(async (req, res) =>{
    try{
        //Lay Id danh muc tu request parmas
        const category = await Categories.findById(req.params.id);

        if(category){
            // Cap nhat tieu de the loai
            category.title = req.body.title || category.title;
            //luu cap nhat the loai vao DB
            const updatedCategory = await category.save();
            //Gui cap nhat the loai den may khach
            res.json(updatedCategory);
        }
        else{
            res.status(404).json({message: "Category not found !"});
        }
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

//@desc delete category
//@route DELETE /api/categories/:id
//@access Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Categories.findByIdAndRemove(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        
        res.status(200).json({ message: 'Đã xoá thể loại khỏi DB !' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export {getCategories, creatCategory, updateCategory, deleteCategory,

}