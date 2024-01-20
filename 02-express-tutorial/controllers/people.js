// import people array
let  { people } = require('../data')


const getPeople = (req, res)=>{
    res.status(200).json({success:true, data:people})
}

const createPerson = (req,res)=>{
    
    // obtaining the name from the request body
    const { name } = req.body
    if(name){
        return res.status(201).json({success:true, person:name})
    }else{
        return res.status(400).json({success:false, msg:'please provide name value'})
    }
    
}


const createPersonPostman = (req, res)=>{
    const { name } = req.body

    if(name){
        return res.status(201).json({success:true, data: [...people, {name}]})
    }else{
        return res.status(400).json({success:false, msg:'please provide name value'})
    }
}


const updatePerson = (req, res)=>{
    // getting the id param
    const { id } = req.params

    // getting the name value from the request body
    const { name } = req.body

    // finding the person with the same id
    const person = people.find((person)=> person.id === Number(id))

    if(person){
        // iterating over the people's array and making changes
        const newPeople = people.map((person)=>{
            if(person.id === Number(id)){
                person.name = name
            }
            return person
        })
        res.status(200).json({success:true, data:newPeople})
        
    }else{
        // returning an error 
        return res.status(400).json({success:false, msg:`no person with id: ${id}`})
    }

}

const deletePerson = (req, res)=>{
    // getting the id param
    const { id } = req.params

    // finding the person with the same id
    const person = people.find((person)=> person.id === Number(id))

    if(person){
        // iterating over the people's array and making changes
        const newPeople = people.filter(person => person.id !== Number(id))
        res.status(200).json({success:true, data:newPeople})
        
    }else{
        // returning an error 
        return res.status(400).json({success:false, msg:`no person with id: ${id}`})
    }

}

// exporting all the functions

module.exports ={
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
}