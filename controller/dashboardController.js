const User = require('../model/usermodel')
const Jobprovider = require('../model/jobprovidermodel')
const Job = require('../model/jobpostingmodel')
dashboard = async(req,res) => {
    totaluser=0
    totalemployer=0
    totaljob=0
    await User.countDocuments().then(
        usercount =>{
            totaluser = usercount
        }
    )
    await Jobprovider.countDocuments().then(
        jobprovidercount =>{
            totalemployer = jobprovidercount
        }
    )
    await Job.countDocuments().then(
        jobcount =>{
            totaljob = jobcount
        }
    )
    res.json({
        status : 200,
        success : true,
        totaluser : totaluser,
        totalemployer : totalemployer,
        totaljob : totaljob
    })
}


module.exports ={
    dashboard
}