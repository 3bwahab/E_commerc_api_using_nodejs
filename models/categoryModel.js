const mongoose=require('mongoose');


//1-create Schema
const categorySchema=new mongoose.Schema({
    name: {
        type : String,
        require:[true,'category name require'],
        unique:[true,'category name must be unique'],
        minlength:[2,'too short category name'],
        maxlength:[30,'too long category name'],
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
  const categoryModel= mongoose.model('category',categorySchema);
  
  module.exports=categoryModel;