const JobProvider = require('../model/jobprovidermodel')
const User = require('../model/usermodel')
const bcrypt = require('bcrypt')
const saltround = 10

function register(req,res){
    var validate = ""
    if(req.body.name == ""){
        validate+="Name is reqd \n"
    }
    if(req.body.password == ""){
        validate+="Password is reqd \n"
    }
    if(req.body.email == ""){
        validate+="Email is reqd \n"
    }
    if(req.body.company_name == ""){
        validate+="Company Name is reqd \n"
    }
    if(req.body.company_description == ""){
        validate+="Company Description is reqd \n"
    }
    if(req.body.company_strength == ""){
        validate+="Company Strength is reqd \n"
    }
    if(req.body.tagline == ""){
        validate+="Tagline is reqd \n"
    }
    if(req.body.website == ""){
        validate+="Website is reqd \n"
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
                    let userobj = new User()
                    userobj.email = req.body.email
                    userobj.name = req.body.name
                    userobj.userType = 2
                    userobj.password = bcrypt.hashSync(req.body.password,saltround)
                    userobj.save().then(
                        data=>{
                            if(data){
                                let provider = new JobProvider()
                                provider.company_name =req.body.company_name
                                provider.company_description =req.body.company_description
                                provider.company_strength =req.body.company_strength
                                provider.tagline =req.body.tagline
                                provider.website =req.body.website
                                provider.userId = data._id
                                if(req.file){
                                    provider.company_logo='logo/'+req.file.filename
                                }
                                provider.save()
                                res.json({
                                    status : 200,
                                    success : true,
                                    msg : 'Company registered'
                                })

                            }
                            else{
                                res.json({
                                    status : 409,
                                    success : false,
                                    msg : 'Company already exists'
                                })
                            }
                        }
                    )
                }
                else{
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Company already exists'
                    })
                }
            }
        )
    }
}


function getallJobprovider(req,res){
    JobProvider.find(req.body).populate('userId').exec().then(
        data=>{
            if(data == null){
                res.json({
                    status : 409,
                    success : false,
                    msg : 'Data no found' 
                })
            }
            else{
                res.json({
                    status : 200,
                    success : true,
                    msg : 'Data retrieved',
                    data : data
                })
            }
        }
    )
}

function singleJobprovider(req,res){
    var validate = ""
    if(req.body._id == ""){
        validate+="Id is reqd \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        JobProvider.findOne({_id : req.body._id}).populate('userId').then(
            data=>{
                if(data == null){
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Data no found' 
                    })
                }
                else{
                    res.json({
                        status : 200,
                        success : true,
                        msg : 'Data retrieved',
                        data : data
                    })
                }
            }
        )


    }
}

function update(req,res){
    var validate = ""
    if(req.body.name == ""){
        validate+="Name is reqd \n"
    }
    if(req.body.email == ""){
        validate+="Email is reqd \n"
    }
    if(req.body.company_name == ""){
        validate+="Company Name is reqd \n"
    }
    if(req.body.company_description == ""){
        validate+="Company Description is reqd \n"
    }
    if(req.body.company_strength == ""){
        validate+="Company Strength is reqd \n"
    }
    if(req.body.tagline == ""){
        validate+="Tagline is reqd \n"
    }
    if(req.body.website == ""){
        validate+="Website is reqd \n"
    }
    
    if(req.body._id == ""){
        validate+="Id is reqd \n"
    }
    if(!!validate){
        res.json({
            stataus : 409,
            success : false,
            msg : validate
        })
    }

    else{
        JobProvider.findOne({_id : req.body._id}).then(
            data=>{
                
                if(data == null){
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Data not updated'
                    })
                }
                else{
                    User.findOne({_id : data.userId}).then(
                        userdata=>{
                            if(userdata == null){
                                res.json({
                                    status : 409,
                                    success : false,
                                    msg : 'Data not update'
                                })
                            }
                            else{
                                userdata.email = req.body.email
                                userdata.name = req.body.name
                                userdata.save().then(
                                    udata=>{
                                        data.company_name = req.body.company_name
                                        data.company_description = req.body.company_description
                                        data.company_strength = req.body.company_strength
                                        data.tagline = req.body.tagline
                                        data.website = req.body.website
                                        if(req.file){
                                            data.company_logo='logo/'+req.file.filename
                                        }
                                        data.save()
                                        res.json({
                                            status : 200,
                                            success : true,
                                            msg : 'Data inserted'
                                        })
                                    }
                                )



                            }
                        }
                    )
                }
            }
        )
    }
}

function approvereject(req,res){
    var validate = ""
    if(req.body._id == "")
        validate+="Id is reqd \n"
    if(req.body.approval_status == "")
        validate+="Approval Satus is reqd \n"
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        JobProvider.findOne({_id : req.body._id}).then(
            data =>{
                if(data == null){
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Job Provider not found'
                    })
                }
                else{
                    data.approval_status = req.body.approval_status
                    data.save()
                    res.json({
                        status : 200,
                        success : true,
                        msg : 'Approval status updated'
                    })
                }
            }
        )
    }
}

module.exports = {
    register,
    getallJobprovider,
    singleJobprovider,
    update,
    approvereject
}