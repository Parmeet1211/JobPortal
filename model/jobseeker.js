const mongoose = require('mongoose')

const jobseeker = new mongoose.Schema({
    userId : {type : mongoose.SchemaTypes.ObjectId , ref : 'user' , default : null},
    name : {type : String , default : null},
    city : {type : String , default  : null},
    country : {type : String , default : null},
    state : {type : String , default : null},
    pincode : {type : Number , default : 0},
    email : {type : String , default : null},
    education : [{
            course : {type : String , default : null},
            university : {type : String , default : null},
            fromyear : {type : Number , default : 0},
            toyear : {type : Number , default : 0},
            marks : {type : Number , default : 0}
        }],
    social_link : [{
        github : {type : String , default : null},
        facebook : {type : String , default: null},
        linkedIn : {type :String , default : null}
    }],
    resumefile : {type : String , default : null},
    skills : [{
        skillId : {type : mongoose.SchemaTypes.ObjectId , ref : 'skill' , default : null}
    }],
    password : {type : String , default : null},
    createdAt : {type : Date , default : Date.now()},
    updatedAt : {type : Date , default : Date.now()}
})


module.exports = new mongoose.model('seeker',jobseeker)