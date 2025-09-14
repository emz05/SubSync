// err: info that occured before request, next: what occurs after
// create subscription -> middleware (check for renewal date) -> middleware (check for errors) -> next -> controller

const errorMiddleware = (err, req, res, next) => {
    try{
        // create shallow copy of error obj
        let error = {... err};
        // store copy of error obj message
        error.message = err.message;
        console.error(err);

        //mongoose bad ObjectId
        // ie. pass invalid id like GET /users/abc123
        if(err.name == 'CastError'){
            const message = 'Resource not found';

            error = new Error(message);
            error.statusCode = 404;
        }

        //mongoose duplicate key 
        // ie. registering with an email that already exists
        if(err.code == 11000){
            const message = 'Duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        //mongoose validation error
        // ie. schema validationfails -> password too short, missing required fields
        if(err.name == 'ValidationError'){
            // collects all validation errors and returns into one response
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }
        
        res.status(error.statusCode || 500).json({success: false, error: error.message || 'Server Error'});
    }catch(error){
        // send error to next step to alert error occured
        next(error);
    }
}

export default errorMiddleware;