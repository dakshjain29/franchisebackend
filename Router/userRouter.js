var express=require("express")
var userRouter=express.Router()

var obj=require('../Controller/UserControl')
const { ValidateTokenjs } = require("../config/Validate")

userRouter.get("/saveuser",obj.dosaveUserGet)
userRouter.post("/doSaveUserPost",obj.doSaveUserWithPost)


module.exports=userRouter