const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,'too short ptoduct title'],
        maxlength:[100,'too long product title'],
    },
    slug:{
        type:String,
        required:true,
        lowercase:true,
    },
    description:{
        type:String,
        required:[true,'product description is required'],
        minlength:[20,'too short product description'],
    },
    quantity:{
        type:Number,
        required:[true,'product quantity is required'],
    },
    sold:{
        type:Number,
        default:0,
    },
    price:{
        type:Number,
        required:[true,'product price is required'],
        trim:true,
        max:[200000,'too long prodct price'],
    },
    priceAfterDiscount:{
        type:Number,
    },
    colors:[String],
    imageCover:{
        type:String,
        required:[true,'product image cover is required'],
    },
    images:[String],

    category:{
        type:mongoose.Schema.ObjectId,
        ref:'category',
        required:[true,'product must be belong to category'],
    },

    subCategory:[{
        type:mongoose.Schema.ObjectId,
        ref:'subCategory',
    },
    ],

    prand:{
        type:mongoose.Schema.ObjectId,
        ref:'brand',
    },
    ratingsAverage:{
        type:Number,
        min:[1,'rating must be up or equal 1.0'],
        max:[5,'rating must be below or equal 5.0'],
    },
    ratingsQuantity:{
        type:Number,
        default:0,
    },


},{timestamps:true});


//mongoose query middleware
productSchema.pre(/^find/, function(next){
    this.populate({
        path:'category',
        select:'name -_id',
    });
    next();
});

module.exports=mongoose.model('product',productSchema)