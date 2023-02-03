
const express = require('express')
const bodyParser= require('body-parser')
const mysql= require('mysql')

require('dotenv').config()

const app=express()

const port= process.env.PORT || 1100


app.use(bodyParser.urlencoded({extended: false }) )

//parse Application / json

app.use(bodyParser.json())
// static File
app.use( express.static('public') )

//template engine
app.set('view engine','ejs')



// connect pool

const pool= mysql.createPool({
    connectionLimit:100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:process.env.DB_NAME

});

//connect DB

pool.getConnection( (err,connection)=>{
    if(err)throw err // not connected
    console.log("Conected as ID " + connection.threadId )
} )






const routes= require('./routes/userRoute')
app.use('/',routes)







app.listen(port, ()=>{
    console.log(" Server run in port 1100 ")
});