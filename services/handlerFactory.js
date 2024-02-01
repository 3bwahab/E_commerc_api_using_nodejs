const asyncHandler = require('express-async-handler');
const apiError=require('../utils/apiError');
const ApiFeatures=require('../utils/apiFeatures');

exports.deleteOne=(model)=>
    asyncHandler(async(req,res,next)=>{
        const {id}=req.params;
        const document=await model.findByIdAndDelete(id);

        if(!document){
            return next(new apiError(`no brand for this id ${id}` , 404));
        }
        res.status(204).send();
     });


     exports.updateOne=(model)=>
        asyncHandler(async(req,res,next)=>{
       
            const {name}=req.body;
    
            const document=await model.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new:true});
    
            if(!document){
             return next(new apiError(`no document for this id ${ req.params.id}` , 404));
            }
            res.status(200).json({data:document});
    
         });

     exports.createOne=(model)=> asyncHandler(async(req,res)=>{
            
            
        const newDoc=await  model.create(req.body);
        res.status(201).json({data:newDoc});
        
        
 } );


    exports.getOne=(model)=>asyncHandler(async(req,res,next)=>{
        const {id}=req.params;
    
    
        const document=await model.findById(id);
        if(!document){
          return next(new apiError(`no document for this id ${id}` , 404));
        }
        res.status(200).json({data:document});
    
    });


    exports.getAll=(model,modelName='')=>asyncHandler(async(req,res)=>{


        let filter={};
        if(req.filterObj){
            filter=req.filterObj;
        }
        //build query
        const documentCounts=await model.countDocuments();
        const apiFeatures=new ApiFeatures(model.find(filter),req.query)
        .paginate(documentCounts)
        .filter()
        .search(modelName)
        .limitFields()
        .sort();
        
        //exucite this query
        const{mongooseQuery,paginationResult}=apiFeatures;
        const documents=await mongooseQuery;
        
        
         res.status(200).json({results:documents.length,paginationResult,data:documents});
            });
       
        