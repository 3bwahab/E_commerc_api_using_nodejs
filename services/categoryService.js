const categoryModel=require('../models/categoryModel');
const factory=require('./handlerFactory');


//descrioption get all categories
//route GET /api/v1/category
//access public
exports.getCategories=factory.getAll(categoryModel);

//descrioption get category with id 
//route GET api/v1/category
//access public
exports.getCategory=factory.getOne(categoryModel);

    //description create category
    //route POST  /api/v1/category
    //access private
    exports.creatCategory=factory.createOne(categoryModel);


     //description update category
     //route PUT /api/v1/category/:id
     //access private
     exports.updateCategory=factory.updateOne(categoryModel);

     //descrioption delete category
     //route DELETE /api/v1/category/:id
     //access: private

     exports.deleteCategory=factory.deleteOne(categoryModel);
    ;