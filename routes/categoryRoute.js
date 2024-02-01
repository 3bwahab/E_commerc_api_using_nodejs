const express=require('express');
const {getCategoryValidator,createCategoryValidator,updateCategoryValidator,deleteCategoryValidator}=require('../utils/validators/categoryValidator');


const {
    getCategories,
    getCategory,
    creatCategory,
    updateCategory,
    deleteCategory,

}=require('../services/categoryService');

const subCategoryRoute=require('./subCategoryRoute');
const router=express.Router();


router.use('/:categoryId/subCategories',subCategoryRoute);

router.route('/')
.get(getCategories)
.post(createCategoryValidator,creatCategory);


router.route('/:id')
.get( getCategoryValidator,getCategory)
.put(updateCategoryValidator,updateCategory)
.delete(deleteCategoryValidator,deleteCategory);

module.exports=router;
