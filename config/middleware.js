const jwt = require('jsonwebtoken')
const secretkey = "helper@2023"

module.exports = middleware = (req,res,next) =>{
    token = req.headers['authorization']
    jwt.verify(token,secretkey,(err,data)=>{
        if(err){
            res.json({
                status : 401,
                success : false,
                msg : 'Unauthenticated'
            })
        }
        else{
            next()
        }
    })
}