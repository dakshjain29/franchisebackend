var mongoose=require("mongoose")
function getUserModel(){
    if (mongoose.models.applicants) {
        return mongoose.models.applicants;
      }

    var userSchema=mongoose.Schema;

var userColSchema={
    name:{type:String, required:true},
    email:{type:String ,unique:true},
    contact:{type:Number},
    ResiAdress:String,
    businessExp:{type:String},
    yearsInBus:{type:Number},
    siteloc:{type:String},
    city:{type:String},
    district:{type:String},
    pincode:{type:Number},
    LArea:{type:Number},
    BArea:{type:Number},
    ownership:{type:String},
    DOA:{type:Date,default:Date.now},
    status:{type:Number,default:0}
    
}
var ver={
    versionKey:false
}
var UserColSchema=new userSchema(userColSchema,ver);
var UsercolRef=mongoose.model("applicants",UserColSchema);

return UsercolRef
}

module.exports={getUserModel}