var {getUserModel}=require("../Model/userModel")
var UsercolRef=getUserModel()
var path=require("path");
var jwt=require("jsonwebtoken");
// const { truncate } = require("fs");

var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dyhwcnowc',
  api_key: '976766561633563',
  api_secret: 'NvYr89fxsFM80sJ9feZj5jj9xTI',
});

function dosaveUserGet(req,resp)
{
    // console.log(req.query);
    var userobj=new UsercolRef(req.query);

    userobj.save().then((document)=>{
        //resp.send(document);
        resp.json({doc:document,status:true,msg:"saved successfully"})
    }).catch((err)=>{
        // console.log(err.message);
        // resp.send(err.message);
        resp.json({status:false,msg:err.message})
    })
}

function doSaveUserWithPost(req,resp)
{
        console.log(req.body);
    
        var userObj=new UsercolRef(req.body);
        userObj.save().then((document)=>{
                //resp.send(document)
                resp.json({doc:document,status:true,msg:"Saved Successfully with post"});

        }).catch((err)=>{
                // console.log(err.message);
                //resp.send(err.message)
                resp.json({status:false,msg:err.message});

        })
}

// async function doUploadpicPost(req,resp)
// {

//     var filename="nopic.jpg";
//     if(req.files!=null)
//     {
//         filename=req.files.pic.name;
//         var filepath=path.join(__dirname,"..","uploads",filename);
//         req.files.pic.mv(filepath);

//         // await cloudinary.uploader.upload(filepath).then((result)=>{
//         //     filename=result.url;
//         //     console.log(result)
//         // }).catch(()=>{
            
//         // })
        
//         // console.log(filepath)
        
//     }
//     else
//     console.log(req.files);


//     req.body.picpath=filename; //adding a n ew field in body object



//     //==========================================
//     var userJson=new UsercolRef(req.body);

//     userJson.save().then((document)=>{
//         jwtoken=jwt.sign({uid:req.body.uid},process.env.SEC_KEY,{expiresIn:"10m"});
//         resp.json({doc:document,status:true,msg:"saved successfully",token:jwtoken})  //saved doc will be returned
//     }).catch((err)=>{
//         resp.json({status:false,msg:err.message});
//     })
// }

// function doValidateToken(req,resp)
// {
//    const fulltkn=req.headers['authorization'];
//    console.log(fulltkn)
   
//    var ary=fulltkn.split(" ");
//    let actualtoken=ary[1];
//    let isValistkn;

//    try{
//     isValistkn=jwt.verify(actualtoken,process.env.SEC_KEY);
//     if(isValistkn!=null){
//         const payload=jwt.decode(ary[1]);

//         resp.json({sattus:true,msg:"* Autorized *",item:payload})
//     }
//    }
//    catch(err){
//     resp.json({status:false,msg:"** SORRY **"});
//    }
    
// }





// function DeleteUser(req,resp){

//     console.log("hello inside curd");

//     UsercolRef.deleteOne({uid:req.body.uid}).then((msg)=>{
//         if(msg.deletedCount==1)
//         resp.json({status: true,msg:"deleted"})
        
//         else
//         resp.json({status:true,message: "invalid id",item:"token "})

//     }).catch((err)=>{
//         resp.json({status:false,msg:err.message});
//     })
// }

// function DoLoginUser(req,resp){

//     UsercolRef.find({uid:req.query.uid,pwd:req.query.pwd}).then((doc)=>{
//         if(doc.length!=0){
//             resp.send(doc)
//         }
//         else{
//             resp.send("invalid email/pass");
//         }
//     }).catch((err)=>{
//         resp.send(err.message)
//     })
// }

// function updateUserDetail(req,resp){
    
//     UsercolRef.updateOne({uid:req.query.uid},{$set:{pwd:req.query.npwd}}).then(()=>{
//         resp.send("done");
//     }).catch((err)=>{
//         resp.send(err.message)
//     })
// }

module.exports={dosaveUserGet,doSaveUserWithPost}