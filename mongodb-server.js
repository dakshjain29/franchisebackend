// const { error } = require("console");
var express=require("express");
var fileuploader=require("express-fileupload");
var mongoose=require("mongoose")
var app=express();
var path=require("path");

var cloudinary = require('cloudinary').v2;



cloudinary.config({
  cloud_name: 'dyhwcnowc',
  api_key: '976766561633563',
  api_secret: 'NvYr89fxsFM80sJ9feZj5jj9xTI',
});


app.listen(2008,function(){
    console.log("Server Started...");
})
app.use(express.static("public"));
app.use(fileuploader());

var url="mongodb+srv://dakshj2090:Daksh29@mern.mp9qg.mongodb.net/?retryWrites=true&appName=MERN";

mongoose.connect(url).then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log(err.message);
})

var userSchema=mongoose.Schema;

var userColSchema={
    uid:{type:String, required:true,index:true,unique:true},
    pwd:String,
    dos:{type:Date,default:Date.now},
    picpath:String,
    
}
var ver={
    versionKey:false
}
var UserColSchema=new userSchema(userColSchema,ver);
var UsercolRef=mongoose.model("usercollection",UserColSchema);


app.get("/saveuser",(req,resp)=>{
    console.log(req.query);
    var userobj=new UsercolRef(req.query);

    userobj.save().then((document)=>{
        resp.send(document)
    }).catch((err)=>{
        console.log(err.message);
        resp.send(err.message);
    })
})

app.post("/uploadwithpic",async(req,resp)=>{

    var filename="nopic.jpg";
    if(req.files!=null)
    {
        filename=req.files.picpath.name;
        var filepath=path.join(__dirname,"uploads",filename);
        

        await cloudinary.uploader.upload(filepath).then((result)=>{
            filename=result.url;
            console.log(result)
        }).catch(()=>{
            
        })
        
        // console.log(filepath)
        
    }
    else
    console.log(req.files);


    req.body.picpath=filename; //adding a n ew field in body object



    //==========================================
    var userJson=new UsercolRef(req.body);

    userJson.save().then((doc)=>{
        resp.send(doc);  //saved doc will be returned
    }).catch((err)=>{
        resp.send(err.message);
    })
})

app.get("/showall",(req,resp)=>{
    
    UsercolRef.find().then((document)=>{
        resp.send(document)
    }).catch((err)=>{
        console.log(err.message)
        resp.send(err.message)
    })



})

app.get("/deleteone",(req,resp)=>{

    UsercolRef.deleteOne({uid:req.query.uid}).then((msg)=>{
        resp.send("deleted")
    }).catch((err)=>{
        resp.send(err.message);
    })
})

app.get("/login",(req,resp)=>{

    UsercolRef.find({uid:req.query.uid,pwd:req.query.pwd}).then((doc)=>{
        if(doc.length!=0){
            resp.send(doc)
        }
        else{
            resp.send("invalid email/pass");
        }
    }).catch((err)=>{
        resp.send(err.message)
    })
})

app.get("/updateuser",(req,resp)=>{
    
    UsercolRef.updateOne({uid:req.query.uid},{$set:{pwd:req.query.npwd}}).then(()=>{
        resp.send("done");
    }).catch((err)=>{
        resp.send(err.message)
    })
})

app