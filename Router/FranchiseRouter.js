var express=require("express")
var FranchRouter=express.Router()

var obj=require('../Controller/FranchiseControl') 

FranchRouter.post("/loginFranchise",obj.DoLoginFranchise);
FranchRouter.post("/changepwd",obj.DoChnagepwd)
FranchRouter.post("/saveSales",obj.doSaveSales)
FranchRouter.post("/fetchSales",obj.FetchSalesData)

module.exports=FranchRouter