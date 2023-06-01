const User = require('../model/usermodel')
const bcrypt  = require('bcrypt')
const saltround = 10
const jwt = require('jsonwebtoken')
const secretkey = "helper@2023"


function updatePassword(req,res){

    //password is updating in user model only
    var validator = ""
    if(req.body.oldpassword == ""){
        validator+="Old password required"
    }
    if(req.body.newpassword == ""){
        validator+="New password required"
    }
    if(req.body.confirmpassword == ""){
        validator+="Confirm password required"
    }
    if(req.body.userId == ""){
        validator+="User id is required"
    }
    if(!!validator){
        res.json({
            status : 409,
            success : false,
            msg : validator
        })
    }
    else{
        // comparing newpassword with confirm password
        if(req.body.newpassword == req.body.confirmpassword){
            User.findOne({_id : req.body.userId}).then(
                userdata=>{
                    if(userdata==null)
                    {
                        res.json({
                            status:404,
                            success:false,
                            msg:'User not found'
                        })
                    }
                    else{
                        bcrypt.compare(req.body.oldpassword,userdata.password,(data,err)=>{
                            console.log(data)
                        })
                    }
                }
            )
        }
    }
}


function login(req,res){
    // validator
    var validate = ""
    if(req.body.email == ""){
        validate+="Email is reqd \n"
    }
    if(req.body.password == ""){
        validate+="Password is reqd \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        User.findOne({email : req.body.email}).then(
            userdata=>{
                if(userdata == null){
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'User not exists'
                    })
                }
                else{
                    bcrypt.compare(req.body.password,userdata.password,(err,data)=>{
                        if(err){
                            res.json({
                                status : 409,
                                success : false,
                                msg : 'Invalid Password'
                            })
                        }
                        else{
                            if(data)
                            {

                                payload={
                                    _id : userdata._id,
                                    name : userdata.name,
                                    email : userdata.email,
                                    userType : userdata.userType
                                }
    
                                token = jwt.sign(payload,secretkey)
                                res.json({
                                    status : 200,
                                    success : true,
                                    msg : 'Login successfully',
                                    token : token,
                                    data:userdata
                                })
                            }
                            else{
                                res.json({
                                    status : 409,
                                    success : false,
                                    msg : 'Invalid password',
                                })
                            }
                        }
                    })
                }
            }
        )
    }
}
module.exports = {
    updatePassword,
    login
}