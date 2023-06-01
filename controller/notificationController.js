const Notification = require('../model/notificationmodel')

function addNotification(req,res){
    var validate = ""
    if(req.body.title == ""){
        validate+="Title is reqd \n"
    }
    if(req.body.description == ""){
        validate+="Description is reqd \n"
    }
    if(req.body.jobId == ""){
        validate+="Job Id is reqd \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        let notificationObj = new Notification()
        notificationObj.title = req.body.title
        notificationObj.description = req.body.description
        notificationObj.jobId = req.body.jobId
        notificationObj.save()
        res.json({
            status : 200,
            success : true,
            msg : 'Notification added'
        })

    }
}


function getallnotification(req,res){
    Notification.find(req.body).populate('jobId').then(
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

function singleNotification(req,res){
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
        Notification.findOne({ _id : req.body._id}).populate('jobId').then(
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

function updateNotification(req,res){
    var validate = ""
    if(req.body.title == ""){
        validate+="Title is reqd \n"
    }
    if(req.body.description == ""){
        validate+="Description is reqd \n"
    }
    if(req.body.jobId == ""){
        validate+="Job Id is reqd \n"
    }
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
        Notification.findOne({_id : req.body._id}).then(
            data=>{
                if(data == null){
                    req.json({
                        status : 409,
                        success : false,
                        msg : 'Notification not found'
                    })
                }
                else{
                    data.title = req.body.title
                    data.description = req.body.description
                    data.jobId = req.body.jobId
                    data.save()
                    res.json({
                        status : 200,
                        success : true,
                        msg : 'Notification updated'
                    })
                }
            }
        )
    }
}


module.exports = {
    addNotification,
    getallnotification,
    singleNotification,
    updateNotification
}