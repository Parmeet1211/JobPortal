const mongoose = require('mongoose')

const jobProvider = new mongoose.Schema({
    userId : {type : mongoose.SchemaTypes.ObjectId , ref : 'user' , default : null},
    company_name : {type : String , default : null},
    company_description : {type : String , default : null},
    company_strength : {type : String , default : null},
    tagline : {type : String , default : null},
    website : {type : String , default : null},
    company_logo : {type : String , default : null},
    approval_status : {type : Number , default : 1},
    createdAt : {type : Date , default : Date.now()}
})


module.exports = new mongoose.model('jobprovider',jobProvider)