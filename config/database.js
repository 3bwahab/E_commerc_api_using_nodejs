const mongoose=require('mongoose');

const dbConnection=()=>{
    mongoose.connect(process.env.DB_URL).then((conn)=>{
        console.log(`database connected: ${conn.connection.host}`);
     })
 
    
};
module.exports=dbConnection;