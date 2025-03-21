
var path=require("path");
var {getFranchiseCredModel}=require("../Model/FranchiseCredModel")
var FranchiseCredRef=getFranchiseCredModel() 
var{getFranchiseSalesModel}=require("../Model/FranchiseSales")
var FranchiseSalesRef=getFranchiseSalesModel()
var jwt=require("jsonwebtoken");
function DoLoginFranchise(req,resp){
    // console.log(req.body.fremail)
    // console.log(req.body.pass)
    FranchiseCredRef.findOne({email:req.body.fremail , password: req.body.pass}).then((document)=>{
        // console.log(document)
        jwtoken=jwt.sign({},process.env.SEC_KEY,{expiresIn:"10m"});
        resp.json({appdata:document,status:true,token:jwtoken})

    }).catch((err)=>{
        // console.log(err.message)
        resp.json({msg: err.message,status:false})
    })

}

function DoChnagepwd(req,resp){
    // console.log(req.body.fremail)
    // console.log(req.body.npass)
    
    FranchiseCredRef.updateOne({email:req.body.fremail},{$set:{password:req.body.npass}}).then((document)=>{
        // console.log(document)
        resp.json({appdata:document,status:true})
    }).catch((err)=>{   
        // console.log(err.message)
        resp.json({msg: err.message,status:false})
    })
}

function doSaveSales(req,resp){
    // console.log(req.body)
    var sales=new FranchiseSalesRef(req.body)
    sales.save().then((document)=>{
        // console.log(document)
        resp.json({appdata:document,status:true})
    }).catch((err)=>{
        // console.log(err.message)
        resp.json({msg: err.message,status:false})
    })
}

function FetchSalesData(req,resp){
    // console.log(req.body.email)
    // console.log(req.body.fromdate)
    // console.log(req.body.todate)
    FranchiseSalesRef.find({email:req.body.email,date:{$gte:req.body.fromdate,$lte:req.body.todate}}).then((document)=>{
        // console.log(document)
        resp.json({appdata:document,status:true})
    }).catch((err)=>{
        // console.log(err.message)
        resp.json({msg: err.message,status:false})
    })

}
function FetchSalesCharts(req,resp){
    // console.log(req.body.email)
    FranchiseSalesRef.find({email:req.body.email}).then((document)=>{
        // console.log(document)
        resp.json({appdata:document,status:true})
    }).catch((err)=>{
        // console.log(err.message)
        resp.json({msg: err.message,status:false})
    })

}
module.exports={DoLoginFranchise,DoChnagepwd,doSaveSales,FetchSalesData,FetchSalesCharts}