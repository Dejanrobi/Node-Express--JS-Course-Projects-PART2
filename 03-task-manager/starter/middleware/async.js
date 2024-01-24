// setting the asyncWrapper, passing in the controller, setting the try catch block and waiting for the 
// controller functions to complete, if an error is present, we pass the error to the next middleware which is
// the errorHandler that is at the last of all middlewares hence the error is passed to it
const asyncWrapper = (controller)=>{
    return async (req, res, next)=>{
        try {
            await controller(req, res, next)           
        } catch (error) {
            next(error)            
        }
    }

}

module.exports = asyncWrapper