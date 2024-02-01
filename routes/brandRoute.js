const express=require('express');
const {
    getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator
}=require('../utils/validators/brandValidator');


const {
    getBrands,
    getBrand,
    creatBrand,
    updateBrand,
    deleteBrand,

}=require('../services/brandService');


const router=express.Router();




router.route('/')
.get(getBrands)
.post( createBrandValidator,creatBrand);


router.route('/:id')
.get( getBrandValidator,getBrand)
.put(updateBrandValidator,updateBrand)
.delete(deleteBrandValidator,deleteBrand);

module.exports=router;
