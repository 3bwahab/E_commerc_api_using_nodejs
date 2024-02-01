const mongoose=require('mongoose');


//1-create Schema
const brandSchema=new mongoose.Schema({
    name: {
        type : String,
        require:[true,'brand name require'],
        unique:[true,'brand name must be unique'],
        minlength:[2,'too short brand name'],
        maxlength:[30,'too long brand name'],
    },
    slug:{
        type:String,
        lowercase:true
    },
    iamge:String,
  },
  {timestamps:true   }
  );
  
  //2-creat model that convert schema to model
  module.exports= mongoose.model('brand',brandSchema);
  
  