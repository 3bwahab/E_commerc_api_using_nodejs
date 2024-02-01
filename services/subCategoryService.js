const factory=require('./handlerFactory');

const subCategoryModel=require('../models/subCategoryModel');


exports.setCategoryIdToBody=(req,res,next)=>{
  if(!req.body.category) req.body.category=req.params.categoryId;
  next();
};

//nested route
//Get /api/v1/:categoryId/subCategory
exports.createFilterObj=(req,res,next)=>{
  let filterObject={};
  if(req.params.categoryId) filterObject={category:req.params.categoryId};
  req.filterObj=filterObject;
  next();
};


 //descrioption get all subCategories
//route GET /api/v1/subCategory
//access public
exports.getSubCategories=factory.getAll(subCategoryModel);
    
    //descrioption get subCategory with id 
    //route GET api/v1/subCategory
    //access public
    exports.getSubCategory=factory.getOne(subCategoryModel);


//description create subCategory
    //route POST  /api/v1/subCategory
    //access private
    exports.createSubCategory=factory.createOne(subCategoryModel);



     //description update subCategory
     //route PUT /api/v1/subCategory/:id
     //access private
     exports.updateSubCategory=factory.updateOne(subCategoryModel);

     //descrioption delete subCategory
     //route DELETE /api/v1/subCategory/:id
     //access: private
    
     exports.deleteSubCategory=factory.deleteOne(subCategoryModel);
   