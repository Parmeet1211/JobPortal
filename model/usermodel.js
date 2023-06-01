const mongoose = require('mongoose')

const user = new mongoose.Schema({
  name : {type : String , default : null},
  email : {type : String , default : null},
  password : {type : String ,default : null},
  userType : {type : Number , default : 3},
    // 1-admin 2-job provider 3-job seeker
  isBlocked : {type : Boolean , default : false},
  createdAt : {type :Date,default: Date.now()},
  updatedAt : {type : Date , default : null}
})

module.exports = new mongoose.model('user',user)