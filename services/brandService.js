const brandModel=require('../models/brandModel');
const factory=require('./handlerFactory');


//descrioption get all brands
//route GET /api/v1/brands
//access public
exports.getBrands=factory.getAll(brandModel);
//descrioption get brand with id 
//route GET api/v1/brand:/id
//access public
exports.getBrand=factory.getOne(brandModel);

    //description create brand
    //route POST  /api/v1/brand
    //access private
    exports.creatBrand=factory.createOne(brandModel);

     //description update brand
     //route PUT /api/v1/brand/:id
     //access private
     exports.updateBrand=factory.updateOne(brandModel);

     //descrioption delete brand
     //route DELETE /api/v1/brand/:id
     //access: private

     exports.deleteBrand=factory.deleteOne(brandModel);
   