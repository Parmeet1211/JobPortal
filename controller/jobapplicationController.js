const Jobapplication = require('../model/jobapplicationmodel')

function add(req,res){
    var validate = ""
    if(req.body.jobproviderId == ""){
        validate+="Job provider is reqd \n"
    }
    if(req.body.jobId == ""){
        validate+="Job is reqd \n"
    }
    if(req.body.jobSeekerId == ""){
        validate+="Job seeker is reqd \n"
    }
    if(req.body.applicationStatus == ""){
        validate+="Application Status is reqd \n"
    }
    if(req.body.applicationMessage == ""){
        validate+="Application message is reqd \n"
    }
    if(req.body.feedbackMessage == ""){
        validate+="Job provider is reqd \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        let obj = new Jobapplication()
        obj.jobId = req.body.jobId
        obj.jobSeekerId = req.body.jobSeekerId
        obj.jobproviderId = req.body.jobproviderId
        obj.applicationStatus = req.body.applicationStatus
        obj.applicationMessage = req.body.applicationMessage
        obj.feedbackMessage = req.body.feedbackMessage
        obj.save()
        res.json({
            status : 200,
            success : true,
            msg : 'Data inserted'
        })
    }
}


function getallApplication(req,res){
    Jobapplication.find(req.body).populate('jobproviderId').populate('jobId').populate('jobSeekerId').then(
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


function singleApplication(req,res){
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
        Jobapplication.findOne({ _id : req.body._id}).populate('jobproviderId').populate('jobId').populate('jobSeekerId').then(
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

function updateApplication(req,res){
    var validate = ""
    if(req.body.jobproviderId == ""){
        validate+="Job provider is reqd \n"
    }
    if(req.body.jobId == ""){
        validate+="Job is reqd \n"
    }
    if(req.body.jobSeekerId == ""){
        validate+="Job seeker is reqd \n"
    }
    if(req.body.applicationStatus == ""){
        validate+="Application Status is reqd \n"
    }
    if(req.body.applicationMessage == ""){
        validate+="Application message is reqd \n"
    }
    if(req.body.feedbackMessage == ""){
        validate+="Job provider is reqd \n"
    }
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
        Jobapplication.findOne({_id : req.body._id}).then(
            data=>{
                if(data == null){
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Job application not found'
                    })
                }
                else{
                    data.jobId = req.body.jobId
                    data.jobSeekerId = req.body.jobSeekerId
                    data.jobproviderId = req.body.jobproviderId
                    data.applicationStatus = req.body.applicationStatus
                    data.applicationMessage = req.body.applicationMessage
                    data.feedbackMessage = req.body.feedbackMessage
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

function updateStatus(req,res){
    var validate=""
    if(req.body._id == ""){
        validate+="Id is reqd \n"
    }
    if(req.body.applicationStatus == ""){
        validate+="Application status is reqd \n"
    }
    if(req.body.feedbackMessage == ""){
        validate+="Feedback message is reqd \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        Jobapplication.findOne({_id : req.body._id}).then(
            data=>{
                if(data){
                    data.applicationStatus = req.body.applicationStatus
                    data.feedbackMessage = req.body.feedbackMessage
                    data.save()
                    res.json({
                        status : 200,
                        success : true,
                        msg : 'Status Updated'
                    })
                }
                else{
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Application not found'
                    })
                }
            }
        )
    }
}


module.exports={
    add,
    getallApplication,
    singleApplication,
    updateApplication,
    updateStatus
}