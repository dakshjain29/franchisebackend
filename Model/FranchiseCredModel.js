var mongoose=require("mongoose");

function getFranchiseCredModel(){
    if (mongoose.models.franchiseCred) {
        return mongoose.models.franchiseCred;  
    }
    var franchiseCredSchema=mongoose.Schema;
    var franchiseSchema= new franchiseCredSchema({
        email:{type:String, required:true, unique:true ,index:true},
        password:{type:String, required:true},
    },
    {
        versionKey:false
    }
    );

    var franchiseCredRef=mongoose.model("franchiseCred",franchiseSchema);
    return franchiseCredRef;
}
module.exports={getFranchiseCredModel}