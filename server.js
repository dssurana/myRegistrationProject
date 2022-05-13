var express=require('express')
var app=express()
var bodyParser=require('body-parser')
var userRoute=require('./route/userRoute')
var mongoose=require('mongoose')
var url="mongodb://localhost:27017/testdb"
mongoose.connect(url)
          .then(result=>{
              console.log("you are connected to db")
          })
              .catch(error=>{
                  console.log("error occured")
              })
              app.use(bodyParser.urlencoded({extended:true}))
              app.use(express.json())
              app.use(bodyParser.json())
            
              app.use('/',userRoute)
              let port=process.env.PORT||5000
              app.listen(port,()=>{
                  console.log(`you are connected to the port ${port}`)
              })
    

        
      



