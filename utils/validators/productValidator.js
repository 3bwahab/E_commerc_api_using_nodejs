const{check}=require('express-validator');
const validatorMiddleWare =require('../../middlewares/validatorMiddleWare');
const categoryModle=require('../../models/categoryModel');
const subcategoryModel=require('../../models/subCategoryModel');
const { default: slugify } = require('slugify');

exports.createProductValidator=[
    check('title')
        .isLength({ming:3})
        .withMessage('must be at least 3 chars')
        .notEmpty()
        .withMessage('product required')
        .custom((val,{req})=>{
            req.body.slug=slugify(val);
            return true;
        }),
    check('description')
        .notEmpty()
        .withMessage('product description is required')
        .isLength({max:2000})
        .withMessage('too long description'),
    check('quantity')
        .notEmpty()
        .withMessage('product quantity is required')
        .isNumeric()
        .withMessage('product quantity must be a number'),
    check('sold')
        .optional()
        .isNumeric()
        .withMessage('product quantity must be number'),
    check('price')
        .notEmpty()
        .withMessage('product price is required')
        .isNumeric()
        .withMessage('product price must be a number')
        .isLength({max:32})
        .withMessage('too long price'),
    check('priceAfterDiscount')
        .optional()
        .toFloat()
        .isNumeric()
        .withMessage('product priceAfterDiscount must be a number')
        .custom((value,{req})=>{
            if(req.body.price <= value){
                throw new Error('priceAfterDiscount must be lower than price');
            }
            return true;
        }),
    
    check('colors')
        .optional()
        .isArray()
        .withMessage('colors should be array of string'),
    
    check('imageCover')
        .notEmpty()
        .withMessage('product imageCover is requried'),
    
    check('images')
        .optional()
        .isArray()
        .withMessage('image should be array of string'),

    check('category')
        .notEmpty()
        .withMessage('product must be belong to category')
        .isMongoId()
        .withMessage('invalid id formate')
        .custom((categoryId)=>categoryModle.findById(categoryId).then((category)=>{
            if(!category){
                return Promise.reject(new Error(`no category for this id ${categoryId}`));
            }
        }))
        ,
        
    check('subcategory')
        .optional()
        .isMongoId()
        .withMessage('invalid id formate')
        .custom((subcategoryId)=>subcategoryModel.find({_id: {$exists:true, $in:subcategoryId}}).then((result)=>{
            if(result.length<1 ==result.length!=subcategoryId.length){
                return Promise.reject(new Error(`invalid subcategory id `));
            }
        })
        ).custom((val,{req})=>
        subcategoryModel.find({category:req.body.category}).then(
            (subcategory)=>{
                const subcategoryIdsInDb=[];
                subcategory.forEach((subCategory)=>{
                    subcategoryIdsInDb.push(subCategory._id.toString());
                });
                if(!val.every((v)=>subcategoryIdsInDb.includes(v))){
                    return Promise.reject(new Error(`subcategory must belong to category `)
                    );
                }
            }

        )
        

        ),
    
    check('brand')
        .optional()
        .isMongoId()
        .withMessage('invalid id formate'),

    check('ratingsAverage')
        .optional()
        .isNumeric()
        .withMessage('ratingsAverage must be a number')
        .isLength({min:1})
        .withMessage('rating must be up or equal 1.0')
        .isLength({max:5})
        .withMessage('rating must be below or equal 5.0'),

    check('ratingsQuantity')
        .optional()
        .isNumeric()
        .withMessage('ratingsQuantity must be a number'),
    
        
    validatorMiddleWare,


];


exports.getProductValidator=[
    check('id')
        .isMongoId()
        .withMessage('invalid id formate'),
    validatorMiddleWare,
];

exports.updateProductValidator=[
    check('id')
        .isMongoId()
        .withMessage('invalid id formate'),
    check('title').optional().custom((val,{req})=>{
            req.body.slug=slugify(val);
            return true;
        }),
    validatorMiddleWare,
];


exports.deleteProductValidator=[
    check('id')
        .isMongoId()
        .withMessage('invalid id formate'),
    validatorMiddleWare,
];
