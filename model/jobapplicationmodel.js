const mongoose = require('mongoose')

const jobapplication = new mongoose.Schema({
    jobproviderId : {type : mongoose.SchemaTypes.ObjectId , ref : 'jobprovider' , default : null},
    jobId : {type : mongoose.SchemaTypes.ObjectId , ref :'job' ,default : null},
    jobSeekerId : {type : mongoose.SchemaTypes.ObjectId , ref : 'seeker' , default : null},
    applicationStatus : {type : Number ,default : 1},
    // 1-pending 2-shortlisted 3-rejected
    applicationMessage : {type : String,default : null},
    feedbackMessage : {type : String,default : null},
    createdAt : {type : Date,default :Date.now()},
    updatedAt : {type : Date,default :Date.now()}
})


module.exports = mongoose.model('jobapplication',jobapplication)