const mongoose = require('mongoose')

const notification = new mongoose.Schema({
    title : {type : String , default : null},
    description : {type : String , default : null},
    jobId : {type : mongoose.SchemaTypes.ObjectId , ref: 'job',default : null} ,
    createdAt : {type : Date,default : Date.now()}
})

module.exports = new mongoose.model('notification',notification)