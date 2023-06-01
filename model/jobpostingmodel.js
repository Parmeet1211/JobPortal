const mongoose = require('mongoose')

const jobposting = new mongoose.Schema({
    jobName : {type : String , default : null},
    jobDescription : {type : String , default : null},
    jobproviderId : {type : mongoose.SchemaTypes.ObjectId , ref : 'jobprovider' ,default : null},
    jobRole : {type : String , default : null},
    salaryPackage : {type : Number , default : 0},
    experienceRequirement : {type : Number,default : 0},
    shiftType : {type : Number , default :1},//1-day 2-night
    jobType : {type : Number , default : 1}, //1-full time 2-part time
    orgType : {type : Number , default :1}, //1-govt 2-pvt
    categoryId : {type : mongoose.SchemaTypes.ObjectId , ref : 'category' , default : null},
    subcategoryId : {type : mongoose.SchemaTypes.ObjectId , ref : 'subcategory' , default : null},
    isActive : {type : Boolean,default : true},
    createdAt : {type : Date,default : Date.now()},
    updatedAt : {type : Date,default : Date.now()}
})

module.exports = new mongoose.model('job',jobposting)