// const reqq = require('http')

// const server = reqq.createServer((req,res) => {
//     if(req.url == "/about"){
//         res.end("the about page")
//     }
//     if(req.url == "/"){
//         res.end("the home page")
//     }
// })
// server.listen(3000)


// const express = require('express')
// const app = express()

// app.get('/' , (req, res) => {
//     res.send("hello my name is hunain")
// })

// app.listen(3000)

// const fs =  require('fs')
// console.log("starting")

// fs.writeFile("hunain.txt" , "my name is hunain" , () => {
//     console.log("done")
// })

// console.log("ending")



// const userRouter = require('./routers')
// app.use('/user', userRouter);
// app.use(express.static('public'))

// app.get('/blog/:slug', (req, res) => {
//     res.send(`welcome to ${req.params.slug} page`)
// })

// app.use((req,res, next ) => {
//     console.log(`the time is ${Date.now()} and is a ${req.method} \n`)
//     next()
// })

// app.get('/', (req, res) => {
//     res.send("this is post request")
// })
// app.put('/' , (req, res) => {
//     console.log("testing put request")
//     res.send("this is put request ")
// })
// app.get("/index" , (req, res) => {
//     console.log("trying to serve an HTML file")
//     res.sendFile("templates/index.html" , {root : __dirname})
// })

// const express = require('express')
// const app = express()

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.set("view engine", 'ejs')

// app.get("/", (req, res) => {
//     res.render('index')
// })

// app.post("/form-data", (req, res) => {
//     console.log(req.body)
//     res.send("data received")
// })

// app.listen(3000) 