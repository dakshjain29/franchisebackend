var express=require("express")
var FranchRouter=express.Router()

var obj=require('../Controller/FranchiseControl') 
const { ValidateTokenjs } = require("../config/Validate")
FranchRouter.post("/loginFranchise",obj.DoLoginFranchise);
FranchRouter.post("/changepwd",ValidateTokenjs,obj.DoChnagepwd)
FranchRouter.post("/saveSales",ValidateTokenjs,obj.doSaveSales)
FranchRouter.post("/fetchSales",obj.FetchSalesData)
FranchRouter.post("/fetchSaleChart",obj.FetchSalesCharts)

module.exports=FranchRouter