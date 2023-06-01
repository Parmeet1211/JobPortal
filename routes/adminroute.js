const routes = require('express').Router()
const multer = require('multer')

const categoryController = require('../controller/categoryController')
const subcategoryController = require('../controller/subcategoryController')
const skillController = require('../controller/skillController')
const jobproviderController = require('../controller/jobProviderController')
const jobController = require('../controller/jobpostingController')
const notificationController = require('../controller/notificationController')
const userController = require('../controller/userController')
const applicationController = require('../controller/jobapplicationController')
const jobseeker = require('../controller/jobseekerController')
const dashboard = require('../controller/dashboardController')

const logostorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/logo')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        console.log(uniqueSuffix + file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const logoupload = multer({ storage: logostorage })

const resumestorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/resume')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        console.log(uniqueSuffix + file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const resumeupload = multer({ storage: resumestorage })


//login api
routes.post('/login', userController.login)
//register company
routes.post('/registercompany', logoupload.single('company_logo'), jobproviderController.register)
//register job seeker
routes.post('/addjobseeker',resumeupload.single('resumefile'), jobseeker.addseeker)
// all jobs
routes.post('/alljob', jobController.getallJob)



routes.use(require('../config/middleware'))

// category route starts
routes.post('/addcategory', categoryController.addCategory)
routes.post('/allcategory', categoryController.getallCategory)
routes.post('/singlecategory', categoryController.singleCategory)
routes.post('/updatecategory', categoryController.updateCategory)
routes.post('/enabledisablecategory', categoryController.enabledisable)
// category route ends

// subcategory route start
routes.post('/addsubcategory', subcategoryController.addSubCategory)
routes.post('/allsubcategory', subcategoryController.getallSubCategory)
routes.post('/singlesubcategory', subcategoryController.singleSubCategory)
routes.post('/singlesubcategory', subcategoryController.singleSubCategory)
routes.post('/updatesubcategory', subcategoryController.updateSubCategory)
routes.post('/enabledisablesubcategory', subcategoryController.enabledisable)
// subcategory route end

// skill route start
routes.post('/addskill', skillController.addSkill)
routes.post('/allskill', skillController.getallSkill)
routes.post('/singleskill', skillController.singleSkill)
routes.post('/updateskill', skillController.updateSkill)
// skill route end

//job provider routes start
routes.post('/alljobproviders', jobproviderController.getallJobprovider)
routes.post('/singlejobproviders', jobproviderController.singleJobprovider)
routes.post('/updatejobproviders', logoupload.single('company_logo'), jobproviderController.update)
routes.post('/approverejectjobproviders', jobproviderController.approvereject)
//job provider routes end


// job route start
routes.post('/addjob', jobController.addjob)
// routes.post('/alljob', jobController.getallJob)
routes.post('/singlejob', jobController.singleJob)
routes.post('/updatejob', jobController.update)
routes.post('/enabledisablejob', jobController.enabledisable)
// job route end


// notification route start
routes.post('/addnotification', notificationController.addNotification)
routes.post('/allnotification', notificationController.getallnotification)
routes.post('/singlenotification', notificationController.singleNotification)
routes.post('/updatenotification', notificationController.updateNotification)
// notification route end


// user route start
routes.post('/changepassword', userController.updatePassword)
// user route end


// job application controller start
routes.post('/addapplication', applicationController.add)
routes.post('/allapplication', applicationController.getallApplication)
routes.post('/singleapplication', applicationController.singleApplication)
routes.post('/updateapplication', applicationController.updateApplication)
routes.post('/updatestatus',applicationController.updateStatus)
// job application controller end



// Job seeker start
// routes.post('/addjobseeker',resumeupload.single('resumefile'), jobseeker.addseeker)
routes.post('/allseeker',jobseeker.allSeeker)
routes.post('/singleseeker',jobseeker.singleSeeker)
routes.post('/updateseeker',resumeupload.single('resumefile'),jobseeker.update)
// Job seeker end


// dashboard start
routes.post('/dashboard', dashboard.dashboard)
// dashboard end


module.exports = routes