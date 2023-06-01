const Category = require('../model/categorymodel')

function addCategory(req,res){
    var validate = ""
    if(req.body.category_name == ""){
        validate+="Category is reqd"
    }
    console.log('Category '+req.body.category_name)
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        Category.findOne({ category_name : req.body.category_name}).then(
            data=>{
                if( data == null){
                    let categoryObj = new Category()
                    categoryObj.category_name = req.body.category_name
                    categoryObj.save()
                    res.json({
                        status : 200,
                        success : true,
                        msg : 'Category added'
                    })
                }
                else{
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Category already exists'
                    })
                }
            }
        )
    }
}

function getallCategory(req,res){
    // console.log(req.body)
    Category.find(req.body).then(
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

function singleCategory(req,res){
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
        Category.findOne({ _id : req.body._id}).then(
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

function updateCategory(req,res){
    var validate = ""
    if(req.body.category_name == ""){
        validate+="Category is reqd \n "
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
        Category.findOne({_id : req.body._id}).then(
            data=>{
                console.log(data)
                if(data == null){
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Data not updated'
                    })
                }
                else{
                    data.category_name = req.body.category_name
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
        validate+="Id is required \n"
    }
    if(req.body.isActive == ""){
        validate+="Is Active is reqd \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        Category.findOne({_id : req.body._id}).then(
            data=>{
                if(data == null){
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Data not found'
                    })
                }
                else{
                    data.isActive = req.body.isActive
                    data.updatedAt = Date.now()
                    data.save()
                    res.json({
                        status : 200,
                        success : true ,
                        msg : 'Status updated'
                    })
                }
            }
        )
    }
}

module.exports = {
    addCategory,
    getallCategory,
    singleCategory,
    updateCategory,
    enabledisable
}