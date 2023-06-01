const User = require('../model/usermodel')
const bcrypt = require('bcrypt')
const saltround = 10

exports.adminseeder = (req,res) =>{
    User.findOne({email : 'admin@gmail.com'}).then(
        userdata=>{
            if(userdata == null){
                let userObj = new User()
                userObj.name = "Admin"
                userObj.email = "admin@gmail.com"
                userObj.password = bcrypt.hashSync("123",saltround)
                userObj.userType = 1
                userObj.save()
                console.log('Admin inserted')
            }
            else{
                console.log("Admin already exists")
            }
        }
    )
}