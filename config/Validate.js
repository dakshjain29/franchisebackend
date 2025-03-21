var jwt=require("jsonwebtoken")

function ValidateTokenjs(req,resp,next)
{
    const fulltoken=req.headers['authorization'];

    var ary=fulltoken.split(" ")
    let actualtkn=ary[1];
    let isvalidtoken;

    try{
        isvalidtoken=jwt.verify(actualtkn,process.env.SEC_KEY)

        if(isvalidtoken!=null){

            const payload=jwt.decode(ary[1]);
            console.log(payload);
            next()
        }
        else{
            resp.json({status:false,msg:"TOKEN EXPIRED"})
        }
    }
    catch(err){
        console.log("inside validate.js err ");
        resp.json({status:false,msg:err.message});
        return;
    }
}

module.exports={ValidateTokenjs}