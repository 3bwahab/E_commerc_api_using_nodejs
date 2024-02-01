const { check } = require('express-validator');
const validatorMiddleWare=require('../../middlewares/validatorMiddleWare');
const { default: slugify } = require('slugify');


exports.getCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleWare,
];

exports.createCategoryValidator=[
    check('name')
    .notEmpty()
    .withMessage('category required')
    .isLength({min:3})
    .withMessage('too short category name')
    .isLength({max:32})
    .withMessage('too long category name')
    .custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    validatorMiddleWare,
];


exports.updateCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid category id format'),
    check('name').custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    validatorMiddleWare,
];


exports.deleteCategoryValidator=[ 
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleWare,
];