// const { error } = require("console");
var express=require("express");
var fileuploader=require("express-fileupload");
var mongoose=require("mongoose")
var app=express();
var cors=require("cors")
var dotenv=require("dotenv")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var {url}=require("./config/uconfig")


dotenv.config()
app.use(cors())
app.listen(2008,function(){
    console.log("Server Started...");
})
app.use(express.static("public"));
app.use(fileuploader());

var urll=url

mongoose.connect(urll).then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log(err.message);
})

var userRouter=require('./Router/userRouter')
var AdminRouter=require('./Router/AdminRouter')
var FranchiseRouter=require('./Router/FranchiseRouter')
app.use("/user",userRouter)
app.use("/admin",AdminRouter)
app.use("/franchise",FranchiseRouter)