const express = require('express')
const mysql = require('mysql')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')

const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())

app.use(cors({
    credentials: true,
    origin:['http://localhost:3000'],
    methods:['GET','POST','DELETE','PATCH'],
}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

db.connect((err)=>{
    if(err){
        console.log("connectcion failed!",err)
    }else{
        console.log("Connected to Database")
    }
})


const authenticationToken = ((req,res,next)=>{
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err) return res.sendStatus(403)
        console.log("Desirialization Successful")
        console.log(user, typeof(user))
        console.log("Desirialized user is same as current user", req.session.currentuser == user.name)
        req.session.currentuser = user.name
        next()
    })
})



app.get('/api',authenticationToken,(req,res)=>{
    
    sqlAll = 'select * from shows where user = ?;'

    db.query(sqlAll,req.session.currentuser,(err,result,fields)=>{
        if(err){
            console.log(err.message)
        }else{
            console.log('Query Sucessfull')
            res.send(result)
        }
    })
})

app.post('/api', authenticationToken, (req,res)=>{

    const title = req.body.title
    const rating = req.body.rating
    const review = req.body.review
    const paltform = req.body.platform
    const user = req.session.currentuser

    console.log(paltform)
    
    sqlInsert = 'insert into shows(title,rating,review,platform,user) VALUES(?,?,?,?,?);'

    db.query(sqlInsert, [title,rating,review,paltform,user] ,(err,result,fields)=>{
        if(err){
            console.log(err.message)
        }else{
            console.log('Database Isert Successfull')
            console.log(result)
            res.send(result)
        }
    })
})

// app.post('/api/testjwt', (req,res)=>{

//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token,'b2f7e31f1d5cf089ea044277f6e9fd3a2fa4e9ec2825ffcabf88d8c37dbd997514fe998c36d57069738476dea9d48da3e3a14dd23899e8e7383b6dead174b96e', (err,user)=>{
//         if(err) res.sendStatus(403)
//         console.log(user, typeof(user))
//         console.log("Desirialized user is same as current user", req.session.currentuser == user.name)
//         res.status(200).send("Success")
//     })
// })

app.post('/api/login', (req,res)=>{

    const username = req.body.username
    const password = req.body.pass


    const user = {name: username}
    const accessToken =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)


    if(req.session.info == undefined){
        console.log("Session Undefined, Starting Session")
        req.session.info = {}
    }else{
        console.log(req.session.info)
    }
        
    if(req.session.info[username] == undefined ){
            console.log("Non existing user")
            req.session.currentuser = username
            req.session.info[username] = password
            console.log(req.session.currentuser, typeof(req.session.currentuser))
            res.json({accessToken: accessToken})
    }else{
        if (password != req.session.info[username]){
            console.log("Wrong password")
            res.send(false)
        }else{
            console.log("Login Successful")
            req.session.currentuser = username
            console.log(req.session.currentuser, typeof(req.session.currentuser))
            res.json({accessToken: accessToken})
        }
    }

    console.log("Current User", req.session.currentuser)
    

    // console.log("Latest Users",userPairs)
    // try{
    //     const hashedPass = await bcrypt.hash(password, 10)
    // } catch{

    // }
})



app.patch('/api/:id',(req,res)=>{

    const id = req.params.id
    const review = req.body.review
    const rating = req.body.rating

    sqlUpdate = 'update shows set review = ?, rating = ? where id = ?;'

    db.query(sqlUpdate,[review,rating, id ], (err,result,fields)=>{

        if(err){
            console.log(err.message)
        }else{
            console.log("Patch Succefull")
            res.send(result)
        }
    })
})


app.delete('/api/:id',(req,res)=>{

    let id = req.params.id

    id = parseInt(id)

    console.log(id,typeof(id))
    
    const sqlDelete = 'delete from shows where id = ?;'

    db.query(sqlDelete, id , (err,result,fields)=>{

        if(err){
            console.log(err.message)
        }else{
            console.log("Delete Successfull - Server")
            res.send(result)
        }
    })
})

app.listen(4000,(req,res)=>{
    console.log('server running on port 4000')
})

