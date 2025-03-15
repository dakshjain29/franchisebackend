var mongoose=require("mongoose");

function getFranchiseSalesModel(){
    if (mongoose.models.franchiseSales) {
        return mongoose.models.franchiseSales;  
    }
    var franchiseSalesSchema=mongoose.Schema;
    var franchiseSchema= new franchiseSalesSchema({
        email:{type:String, required:true,index:true},
        date:{type:Date, required:true},
        amount:{type:Number, required:true},
    },
    {
        versionKey:false
    }
    );

    var franchiseSalesRef=mongoose.model("franchiseSales",franchiseSchema);
    return franchiseSalesRef;
}
module.exports={getFranchiseSalesModel}