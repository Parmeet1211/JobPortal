const Skill = require('../model/skillmodel')

function addSkill(req,res){
    var validate = ""
    if(req.body.skill_name == ""){
        validate+="Skill is reqd"
    }
    if(req.body.categoryId == ""){
        validate+="Category is reqd"
    }
    // console.log('Category '+req.body.category_name)
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        Skill.findOne({ skill_name : req.body.skill_name}).then(
            data=>{
                if( data == null){
                    let skillObj = new Skill()
                    skillObj.skill_name = req.body.skill_name
                    skillObj.categoryId = req.body.categoryId
                    skillObj.save()
                    res.json({
                        status : 200,
                        success : true,
                        msg : 'Skill added'
                    })
                }
                else{
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Skill already exists'
                    })
                }
            }
        )
    }
}


function getallSkill(req,res){
    Skill.find(req.body).populate('categoryId').exec
    ().then(
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

function singleSkill(req,res){
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
        Skill.findOne({ _id : req.body._id}).populate('categoryId').then(
            data=>{
                console.log(data)
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

function updateSkill(req,res){
    var validate = ""
    if(req.body.skill_name == ""){
        validate+="Skill is reqd \n "
    }
    if(req.body.categoryId == ""){
        validate+="Category is reqd"
    }
    if(req.body._id == ""){
        validate+="Id is reqd"
    }
    // console.log('Category '+req.body.category_name)
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        Skill.findOne({_id : req.body._id}).then(
            data=>{
                // console.log(data)
                if(data == null){
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Data not updated'
                    })
                }
                else{
                    data.skill_name = req.body.skill_name
                    data.updatedAt = Date.now()
                    data.categoryId = req.body.categoryId
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

module.exports = {
    addSkill,
    getallSkill,
    singleSkill,
    updateSkill
}