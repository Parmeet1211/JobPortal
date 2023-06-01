const SubCategory = require('../model/subCategorymodel')

function addSubCategory(req,res){
    var validate = ""
    if(req.body.subcategory_name == ""){
        validate+="Subcategory is reqd"
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
        SubCategory.findOne({ subcategory_name : req.body.subcategory_name}).then(
            data=>{
                if( data == null){
                    let subcategoryObj = new SubCategory()
                    subcategoryObj.subcategory_name = req.body.subcategory_name
                    subcategoryObj.categoryId = req.body.categoryId
                    subcategoryObj.save()
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


function getallSubCategory(req,res){
    SubCategory.find(req.body).populate('categoryId').exec
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

function singleSubCategory(req,res){
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
        SubCategory.findOne({ _id : req.body._id}).populate('categoryId').then(
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

function updateSubCategory(req,res){
    var validate = ""
    if(req.body.subcategory_name == ""){
        validate+="Subcategory is reqd \n "
    }
    if(req.body.categoryId == ""){
        validate+=""
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
        SubCategory.findOne({_id : req.body._id}).then(
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
                    data.subcategory_name = req.body.subcategory_name
                    data.categoryId = req.body.categoryId
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
        SubCategory.findOne({_id : req.body._id}).then(
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
    addSubCategory,
    getallSubCategory,
    singleSubCategory,
    updateSubCategory,
    enabledisable
}