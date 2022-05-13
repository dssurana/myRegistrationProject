var express = require('express')

var user = require('../model/userModel')

var jwt = require('jsonwebtoken')
var dotenv = require('dotenv').config();
var env= require('../node_modules/dotenv/.env')
var bcrypt = require('bcrypt')

exports.getData = (req, res) => {


    user.findOne({})
        .then(result => {
            console.log("result", result)
            return res.status(200).json(result)
        })
        .catch(error => {
            console.log("error", error)
            return res.status(400).json(error)
        })
}
exports.postData = (req, res) => {
    try {

        user.create({
            username: req.body.username,
            password: req.body.password

        }).then(result => {
            console.log("result:", result)
            return res.status(200).json(result)
        })
            .catch(error => {
                console.log("error:", error)
                return res.status(400).json(error)
            })
    } catch (err) {
        console.log("err", err)
    }
}
exports.register = async (req, res) => {
    try {
        passowrd: { req.body.password }
        let hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log("hashedPassword", hashedPassword)

        let data =
        {
            username: req.body.username,
            password: hashedPassword
        }

        let loginData = await user.saved(data)

        if (loginData == null && loginData == undefined) {
            console.log("error data")

        } else {
            console.log("loginData", loginData)
            return res.status(200).json(loginData)
        }

    } catch (err) {
        console.log("error", err)
    }
}


exports.login =async (req, res) => {
    try {
        let data = {
            username: req.body.username,
            password: req.body.password
        }
        let loginData = await user.login(data)
 
        if (loginData == null && loginData == undefined)
         {
            console.log("error data")
        }
        else {
            let validPass = await bcrypt.compare(data.password,loginData.password)

            if (!validPass) {
                console.log("not valid user")
                return res.status(400).json(error)
            }
            else {
                console.log("login successfully", loginData)
            }
        }
         //generate token
         const token= jwt.sign({username:req.body.username},secret,
                               {expiresIn: '2h'})
           console.log("token",token)
           
           //token decoding
           
          let decoded = jwt.decode(token)
          console.log("decoded",decoded)
         
         // token spliting
            let [header,payload]  =  token.split('.')
            console.log("header and payload",[header ,payload])
 
    } catch (error) {
        console.log("err",error)
    }

}

