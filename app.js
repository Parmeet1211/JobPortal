// console.log('app.js')
const express = require('express')
const config = require('./config/db')
const port = 4000
const app = express()
const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ extended : true}))
app.use(express.static(__dirname + "/public"));
app.use(express.json({limit : '50mb'}))

const adminroutes = require('./routes/adminroute')
app.use('/admin',adminroutes)


app.all('*', (req,res)=>{
    res.json({
        status : 404,
        success : false,
        msg : 'Route not found'
    })
})


const seeder = require('./config/seeder')
seeder.adminseeder()


app.listen(port , ()=>{
    console.log('Server is running on port '+port)
})