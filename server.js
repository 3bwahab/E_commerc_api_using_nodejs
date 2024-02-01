const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');




dotenv.config({path:'config.env'});
const apiError=require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection=require('./config/database');
const categoryRoute=require('./routes/categoryRoute');
const subCategoryRoute=require('./routes/subCategoryRoute');
const brandRoute=require('./routes/brandRoute');
const productRoute=require('./routes/productRoute');


//connect with database
dbConnection();
//Express app
const app=express();

//Middlewares 
app.use(express.json());

if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
    console.log(`mode : ${process.env.NODE_ENV}`);
}



//MountRoutes
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/subCategory',subCategoryRoute);
app.use('/api/v1/brand',brandRoute);
app.use('/api/v1/product',productRoute);


//catch error not handling
app.all('*',(req,res,next)=>{

next(new apiError(`can't find this route ${req.originalUrl}`,400));
});

//globla error handling middleware
app.use(globalError);



const PORT=process.env.PORT ||8000;
const server=app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
    
});

//handle rejection outside express
process.on("unhandledRejection",(err)=>{
         console.error(`unhandledRejection Error : ${err.name} | ${err.message}`);
         server.close(()=>{
            console.error(`Shutting down...`);
            process.exit(1);
         });
      
});