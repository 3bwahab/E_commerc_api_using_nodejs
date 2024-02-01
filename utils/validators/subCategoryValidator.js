const { check } = require('express-validator');
const validatorMiddleWare=require('../../middlewares/validatorMiddleWare');
const { default: slugify } = require('slugify');


exports.getSubCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    validatorMiddleWare,
];

exports.createSubCategoryValidator=[
    check('name')
    .notEmpty()
    .withMessage('Subcategory required')
    .isLength({min:2})
    .withMessage('too short Subcategory name')
    .isLength({max:32})
    .withMessage('too long Subcategory name')
    .custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    check('category').notEmpty().withMessage('subCategory must be belong to a category ')
    .isMongoId().withMessage('Invalid category id format'),
    validatorMiddleWare,
];


exports.updateSubCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    check('name').custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    validatorMiddleWare,
];


exports.deleteSubCategoryValidator=[ 
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    validatorMiddleWare,
];