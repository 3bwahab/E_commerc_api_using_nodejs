const { check } = require('express-validator');
const validatorMiddleWare=require('../../middlewares/validatorMiddleWare');
const { default: slugify } = require('slugify');


exports.getBrandValidator=[
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    validatorMiddleWare,
];

exports.createBrandValidator=[
    check('name')
    .notEmpty()
    .withMessage('Brand required')
    .isLength({min:3})
    .withMessage('too short Brand name')
    .isLength({max:32})
    .withMessage('too long Brand name')
    .custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    validatorMiddleWare,
];


exports.updateBrandValidator=[
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    check('name').custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    validatorMiddleWare,
];


exports.deleteBrandValidator=[ 
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    validatorMiddleWare,
];