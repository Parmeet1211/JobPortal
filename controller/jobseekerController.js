const Jobseeker = require("../model/jobseeker")
const User = require("../model/usermodel")
const bcrypt = require("bcrypt")
const saltround = 10

function addseeker(req, res) {

  var validate = ""
  if (req.body.name == "") {
    validate += "Name is reqd \n"
  }
  if (req.body.email == "") {
    validate += "Email is reqd \n"
  }
  if (req.body.city == "") {
    validate += "City is reqd \n"
  }
  if (req.body.country == "") {
    validate += "Country is reqd \n"
  }
  if (req.body.state == "") {
    validate += "State is reqd \n"
  }
  if (req.body.pincode == "") {
    validate += "Pincode is reqd \n"
  }
  if (req.body.education == "") {
    validate += "Education is reqd \n"
  }
  if (req.body.social_link == "") {
    validate += "Social Link is reqd \n"
  }
  // if (req.body.resumefile == "") {
  //   validate += "Resume is reqd \n"
  // }
  if (req.body.skills == "") {
    validate += "Skill is reqd \n"
  }
  if (!!validate) {
    res.json({
      status: 409,
      success: false,
      msg: validate,
    })
  } else {
    User.findOne({ email: req.body.email }).then((userdata) => {
      // console.log(req.body.email)
      if (userdata == null) {
        let userobj = new User()
        userobj.email = req.body.email
        userobj.userType = 3
        userobj.password = bcrypt.hashSync(req.body.password, saltround)
        userobj.name = req.body.name
        userobj.save().then(async (data) => {
          // console.log(data)
          if (data) {
            let seeker = await new Jobseeker()
            seeker.name = req.body.name
            seeker.email = req.body.email
            seeker.password = req.body.password
            seeker.city = req.body.city
            seeker.state = req.body.state
            seeker.country = req.body.country
            seeker.pincode = req.body.pincode
            if(req.file)
            {
              seeker.resumefile = "resume/"+req.file.filename
            }
            //setting education
            if (typeof req.body.education == "string") {
              let ed = Array()
              let edudata = JSON.parse(req.body.education)
              // console.log(edudata.length)
              for (i = 0; i < edudata.length; i++) {
                ed.push(edudata[i])
              }
              // console.log(ed)
              seeker.education = ed
            } else {
              seeker.education = req.body.education
            }


            //setting social link
            if (typeof req.body.social_link == "string") {
              let social = Array()
              let socialdata = JSON.parse(req.body.social_link)
              // console.log(edudata.length)
              for (i = 0; i < socialdata.length; i++) {
                social.push(socialdata[i])
              }
              // console.log(ed)
              seeker.social_link = social
            } else {
              seeker.social_link = req.body.social_link
            }


            // setting skills
            if (typeof req.body.skills == "string") {
              let skill = Array()
              let skilldata = JSON.parse(req.body.education)
              for (i = 0; i < skilldata.length; i++) {
                skill.push(skilldata[i])
              }
              seeker.skills = skill
            } else {
              seeker.skills = req.body.skills
            }
            // seeker.resume = req.body.resume
            // seeker.skills = req.body.skills
            seeker.userId = data._id
            // console.log(seeker)
            seeker.save()
            res.json({
              status: 200,
              success: true,
              msg: "User Registered",
            })
          }
        })
      } else {
        res.json({
          status: 409,
          success: false,
          msg: "User already exists",
        })
      }
    })
  }
}

function allSeeker(req,res){
  Jobseeker.find(req.body).populate('userId').then(
   (data)=>{
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

function singleSeeker(req,res){
  var validate = ""
  if(req.body._id == ""){
    validate+="ID is reqd \n"
  }
  if(!!validate){
    res.json({
      statis : 409,
      success : false,
      msg : validate
    })
  }
  else{
    Jobseeker.findOne({_id : req.body._id}).populate('userId').then(
      data=>{
        if(data){
          res.json({
            status : 200,
            success : true,
            msg : 'Data retrieved',
            data : data
          })
        }
        else{
          res.json({
            status : 409,
            success : false,
            msg : 'Data not found'
          })
        }
      }
    )
  }
}

function update(req,res){
  console.log(req.body.name)
  var validate = ""
  if (req.body.name == "") {
    validate += "Name is reqd \n"
  }
  if (req.body.email == "") {
    validate += "Email is reqd \n"
  }
  if (req.body.city == "") {
    validate += "City is reqd \n"
  }
  if (req.body.country == "") {
    validate += "Country is reqd \n"
  }
  if (req.body.state == "") {
    validate += "State is reqd \n"
  }
  if (req.body.pincode == "") {
    validate += "Pincode is reqd \n"
  }
  if (req.body.education == "") {
    validate += "Education is reqd \n"
  }
  if (req.body.social_link == "") {
    validate += "Social Link is reqd \n"
  }
  // if (req.body.resumefile == "") {
  //   validate += "Resume is reqd \n"
  // }
  if (req.body.skills == "") {
    validate += "Skill is reqd \n"
  }
  if(req.body.id == ""|| req.body.id == undefined){
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
      Jobseeker.findOne({_id : req.body.id}).then(
          data=>{
              console.log(req.body._id)
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
                                  async (udata)=>{
                                    if (udata) {
                                      // let seeker = await new Jobseeker()
                                      data.name = req.body.name
                                      data.email = req.body.city
                                      // data.password = req.body.password
                                      data.city = req.body.city
                                      data.state = req.body.state
                                      data.country = req.body.country
                                      data.pincode = req.body.pincode
                                      if(req.file)
                                      {
                                        data.resumefile = "resume/"+req.file.filename
                                      }
                                      //setting education
                                      if (typeof req.body.education == "string") {
                                        let ed = Array()
                                        let edudata = JSON.parse(req.body.education)
                                        // console.log(edudata.length)
                                        for (i = 0; i < edudata.length; i++) {
                                          ed.push(edudata[i])
                                        }
                                        // console.log(ed)
                                        data.education = ed
                                      } else {
                                        data.education = req.body.education
                                      }
                          
                          
                                      //setting social link
                                      if (typeof req.body.social_link == "string") {
                                        let social = Array()
                                        let socialdata = JSON.parse(req.body.social_link)
                                        // console.log(edudata.length)
                                        for (i = 0; i < socialdata.length; i++) {
                                          social.push(socialdata[i])
                                        }
                                        // console.log(ed)
                                        data.social_link = social
                                      } else {
                                        data.social_link = req.body.social_link
                                      }
                          
                          
                                      // setting skills
                                      if (typeof req.body.skills == "string") {
                                        let skill = Array()
                                        let skilldata = JSON.parse(req.body.education)
                                        for (i = 0; i < skilldata.length; i++) {
                                          skill.push(skilldata[i])
                                        }
                                        data.skills = skill
                                      } else {
                                        data.skills = req.body.skills
                                      }
                                      // seeker.resume = req.body.resume
                                      // seeker.skills = req.body.skills
                                      // data.userId = data._id
                                      // console.log(seeker)
                                      data.save()
                                      res.json({
                                        status: 200,
                                        success: true,
                                        msg: "User Registered",
                                      })
                                    }
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

module.exports = {
  addseeker,
  allSeeker,
  singleSeeker,
  update
}
