// function response
const notFound=(req, res)=> res.status(404).send("Route does not exist")

// exporting the function
module.exports = notFound