var express=require("express")
var adRouter=express.Router()

var obj=require('../Controller/adminController')

adRouter.get("/fetchdata",obj.FetchAppliData)  
adRouter.post("/acceptapp",obj.doAcceptApplicant)
adRouter.post("/rejectapp",obj.doRejectApplicant)
adRouter.post("/grantapp",obj.doGrantApplicant)
adRouter.post("/addfranchise",obj.DoSaveFranchiseCred)

module.exports=adRouter