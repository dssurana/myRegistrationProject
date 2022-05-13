const req = require('express/lib/request')
const res = require('express/lib/response')
var mongoose=require('mongoose')

let userschema=mongoose.Schema({
    username:String,
    password:String
    
})
userschema.statics.saved= (data) =>
  {
   let userData= mongoose.model('userimp',userschema)
let saveData={
     username:data.username,
     password:data.password
    }
       let mydata = new userData(saveData)
       
             return result= mydata.save()
            }
  userschema.statics.login=(data)=>{
     let userData=mongoose.model('userimp',userschema)
               
               
          return userData.findOne({username:data.username})
      
       
       }
  module.exports=mongoose.model('userimp',userschema)
  
