const mongoose = require('mongoose')

const subcategory = new mongoose.Schema({
    subcategory_name : {type : String,default : null},
    categoryId : { type : mongoose.SchemaTypes.ObjectId , ref : 'category' ,default : null },
    isActive : {type : Boolean,default : true},
    createdAt : {type : Date,default : Date.now()},
    updatedAt : {type : Date,default : Date.now()}
})

module.exports = new mongoose.model('subcategory',subcategory)