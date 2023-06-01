const mongoose = require('mongoose')

const category = new mongoose.Schema({
    category_name : {type : String,default : null},
    isActive : {type : Boolean,default : true},
    createdAt : {type : Date,default : Date.now()},
    updatedAt : {type : Date,default : Date.now()}
})

module.exports = new mongoose.model('category',category)