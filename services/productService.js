const factory=require('./handlerFactory');
const productModel=require('../models/productModel');


//@descrioption get all products
//@route GET /api/v1/prodct
//@access public
exports.getProducts=factory.getAll(productModel,'product');

//@descrioption get product with id 
//@route GET api/v1/product
//@access public
exports.getProduct=factory.getOne(productModel);

    //@description create product
    //@route POST  /api/v1/product
    //@access private
    exports.createProduct=factory.createOne(productModel);


     //@description update product
     //@route PUT /api/v1/product/:id
     //@access private
     exports.updateProduct=factory.updateOne(productModel);

     //@descrioption delete product
     //@route DELETE /api/v1/product/:id
     //@access: private

     exports.deleteProduct=factory.deleteOne(productModel);
   