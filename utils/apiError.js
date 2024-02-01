class apiError extends Error{
constructor(message,statusCode){
    super(message);
    this.statusCode=statusCode;
    this.status=`${statusCode}`.startsWith? 'fail':'error';
    this.isOperational=true;
}
}
module.exports=apiError;