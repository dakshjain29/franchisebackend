var {getUserModel}=require("../Model/userModel")
var AUsercolRef=getUserModel()
var path=require("path");
// var jwt=require("jsonwebtoken");

async function generateId() {
  const { nanoid } = await import('nanoid');
  return nanoid();
}



var {getFranchiseCredModel}=require("../Model/FranchiseCredModel")
var FranchiseCredRef=getFranchiseCredModel() 

function FetchAppliData(req,resp){
    
    AUsercolRef.find().then((document)=>{
        console.log(document)
        resp.json({appdata:document,status:true})
    }).catch((err)=>{
        console.log(err.message)
        resp.json({msg: err.message,status:false})
    })

}

// function UpdateStat(req,resp){
    
//     UsercolRef.updateOne({email:req.query.email},{$set:{status:req.query.status}})
//         .then((document)=>{
//             resp.json({doc:document,msg:true})
//     }).catch((err)=>{
//         console.log(err.message)
//         resp.json({msg:false , errmsg:err.message})
//     })

// }
function doAcceptApplicant(req, resp) {
    AUsercolRef
      .updateOne({ email: req.body.email }, { $set: { status: 1 } })
      .then((doc) => {
        resp.json({
          msg: "Applicant Accepted",
          stat: true,
        });
      })
      .catch((err) => {
        resp.send(err.message);
      });
  }
  
  function doRejectApplicant(req, resp) {
    AUsercolRef.updateOne({ email: req.body.email }, { $set: { status: -1 } })
      .then((doc) => {
        resp.json({
          msg: "Applicant Rejected",
          stat: true,
        });
      })
      .catch((err) => {
        resp.send(err.message);
      });
  }
  
  function doGrantApplicant(req, resp) {
    AUsercolRef.updateOne({ email: req.body.email }, { $set: { status: 2 } })
      .then((doc) => {
        resp.json({
          msg: "Franchise Granted",
          stat: true,
        });
      })
      .catch((err) => {
        resp.send(err.message);
      });
  }

  async function DoSaveFranchiseCred(req,resp){
    var pwd= await generateId();
    var frcredObj=new FranchiseCredRef({
        email:req.body.email,
        password:pwd
    })
    frcredObj.save().then((document)=>{
        resp.json({msg:"Franchise cred saved",status:true,pwd:pwd})
    }).catch((err)=>{
        console.log(err.message)
        resp.json({msg:err.message,status:false})
    })
  }

module.exports={FetchAppliData,doAcceptApplicant,doRejectApplicant,doGrantApplicant,DoSaveFranchiseCred}