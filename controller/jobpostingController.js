const Job = require('../model/jobpostingmodel')

function addjob(req,res){
    var validate = ""
    if(req.body.jobName == "")
        validate+="Job Name is reqd \n"
    if(req.body.jobDescription == "")
        validate+="Job Description is reqd \n"
    if(req.body.jobproviderId == "")
        validate+="Job Provider is reqd \n"
    if(req.body.jobRole == "")
        validate+="Job Provider is reqd \n"
    if(req.body.salaryPackage == "")
        validate+="Salary is reqd \n"
    if(req.body.experienceRequirement == "")
        validate+="Experience is reqd \n"
    if(req.body.shiftType == "")
        validate+="Shift type is reqd \n"
    if(req.body.jobType == "")
        validate+="Job Type is reqd \n"
    if(req.body.orgType == "")
        validate+="Organizatin type is reqd \n"
    if(req.body.categoryId == "")
        validate+="Category is reqd \n"
    if(req.body.subcategoryId == "")
        validate+="Subcategory  is reqd \n" 
    if(req.body.isActive == "")
        validate+="Is Active is reqd \n"   
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        let jobObj =new Job()
        jobObj.jobName = req.body.jobName
        jobObj.jobDescription = req.body.jobDescription
        jobObj.jobproviderId = req.body.jobproviderId
        jobObj.jobRole = req.body.jobRole
        jobObj.salaryPackage = req.body.salaryPackage
        jobObj.experienceRequirement = req.body.experienceRequirement
        jobObj.shiftType = req.body.shiftType
        jobObj.jobType = req.body.jobType
        jobObj.orgType = req.body.orgType
        jobObj.categoryId = req.body.categoryId
        jobObj.subcategoryId = req.body.subcategoryId
        jobObj.isActive = req.body.isActive
        jobObj.save()
        res.json(
            {
                status : 200,
                success : true,
                msg : 'Data inserted'
            }
        )
    }
}


function getallJob(req,res){
    Job.find(req.body).populate('jobproviderId').populate('categoryId').populate('subcategoryId').then(
        data=>{
            if( data == null){
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
                    msg : 'Data retreived',
                    data : data
                })
            }
        }
    )
}

function singleJob(req,res){
    var validate = ""
    if(req.body._id == ""){
        validate+="Id is reqd"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        Job.findOne({ _id : req.body._id}).populate('jobproviderId').populate('categoryId').populate('subcategoryId').then(
            data=>{
                if(data == null){
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Data not found'
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
    if(req.body.jobName == "")
        validate+="Job Name is reqd \n"
    if(req.body.jobDescription == "")
        validate+="Job Description is reqd \n"
    if(req.body.jobproviderId == "")
        validate+="Job Provider is reqd \n"
    if(req.body.jobRole == "")
        validate+="Job Provider is reqd \n"
    if(req.body.salaryPackage == "")
        validate+="Salary is reqd \n"
    if(req.body.experienceRequirement == "")
        validate+="Experience is reqd \n"
    if(req.body.shiftType == "")
        validate+="Shift type is reqd \n"
    if(req.body.jobType == "")
        validate+="Job Type is reqd \n"
    if(req.body.orgType == "")
        validate+="Organizatin type is reqd \n"
    if(req.body.categoryId == "")
        validate+="Category is reqd \n"
    if(req.body.subcategoryId == "")
        validate+="Subcategory  is reqd \n" 
    if(req.body.isActive == "")
        validate+="Is Active is reqd \n" 
    if(req.body._id == "")
        validate+="Id is reqd \n"  
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        Job.findOne({_id : req.body._id}).then(
            data=>{
                if(data == null){
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Job not found'
                    })
                }
                else{
                    data.jobName = req.body.jobName
                    data.jobDescription = req.body.jobDescription
                    data.jobproviderId = req.body.jobproviderId
                    data.jobRole = req.body.jobRole
                    data.salaryPackage = req.body.salaryPackage
                    data.experienceRequirement = req.body.experienceRequirement
                    data.shiftType = req.body.shiftType
                    data.jobType = req.body.jobType
                    data.orgType = req.body.orgType
                    data.categoryId = req.body.categoryId
                    data.subcategoryId = req.body.subcategoryId
                    data.isActive = req.body.isActive
                    data.updatedAt = Date.now()
                    data.save()
                    res.json({
                        status : 200,
                        success : true,
                        msg : 'Data updated'
                    })
                }
            }
        )
    }
}

function enabledisable(req,res){
    var validate = ""
    if(req.body._id == ""){
        validate+="Id is reqd \n"
    }
    if(req.body.isActive == ""){
        validate+="Is active is reqd \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        Job.findOne({_id : req.body._id}).then(
            data=>{
                if(data == null){
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Job not found'
                    })
                }
                else{
                    data.isActive = req.body.isActive
                    data.save()
                    res.json({
                        status : 200,
                        success : true,
                        msg : 'Status updated'
                    })
                }
            }
        )
    }
}

module.exports = {
    addjob,
    getallJob,
    singleJob,
    update,
    enabledisable
}