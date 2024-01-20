// importing Product Model
const ProductModel = require('../models/product')



// sort, select, limit, skip
const getAllProductsStatic = async (req, res)=>{
    // retrieving products in the collection
    const products = await ProductModel.find({
        price:{$gt:30}
    })
    .sort("price")
    .select("name price")
    .limit(10)
    
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async(req, res)=>{
    const { featured, company, name, sort, fields, numericFilters } = req.query
    const queryObject = {

    }

    if(featured){
        queryObject.featured = featured === 'true'? true:false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = { $regex: name, $options:'i'}
    }
    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
        // pass in all the  values
        const regEx = /\b(<|>|>=|=|<=)\b/g
        let filters = numericFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`)

        const options = ['price', 'rating']

        // 
        filters.split(',').forEach((item)=>{
            // array destructuring and splitting based on '-'
            // in array destructuring, whatever you type first, will match the first item in the array
            const [field, operator, value] = item.split('-')

            // only if the field is in our options, then we will add it to our query object
            if(options.includes(field)){
                // setting the property to the query object and its numeric filter
                // the operator is set inside a square bracket because it will be dynamic and will change
                queryObject[field]={[operator]:Number(value)}
            }
        })
        console.log(numericFilters)
        console.log(filters)
    }

    console.log(queryObject)

    // finding the items 
    let result = ProductModel.find(queryObject)

    // sorting the items
    if(sort){
        const sortList = sort.split(',').join(" ")
        result = result.sort(sortList)
    }else{
        result = result.sort('createdAt')
    }

    // selecting certain fields
    if(fields){
        const fieldList = fields.split(',').join(" ");
        result = result.select(fieldList)
    }

    // setting the page functionality
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    // number of items to skip
    // the first page, no items will be skipped, second page, 10 items will be skipped, 
    // the third page, 20 items will be skipped e.t.c.
    const skip = (page - 1)*limit

    // setting the final result
    result = result.skip(skip).limit(limit)

    const products  = await result;
    
    res.status(200).json({products, nbHits: products.length})
}

// exporting the controller functions
module.exports = {
    getAllProducts,
    getAllProductsStatic
}