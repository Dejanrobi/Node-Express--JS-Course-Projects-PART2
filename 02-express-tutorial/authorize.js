// create an authorize middleware.

const authorize = (req, res, next)=>{

    // looking for the user property in the query
    const { user } = req.query;

    if(user === 'john'){
        // we now add a property user to the request object
        req.user = { name: "john", id:3}
        next()

    }else{
        res.status(401).send("Unauthorized")
    }

    
}

// exporting the authorize function
module.exports = authorize;