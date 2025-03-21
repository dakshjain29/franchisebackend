var jwt=require("jsonwebtoken")

function ValidateTokenjs(req, resp, next) {
    const fulltoken = req.headers['authorization'];
    
    if (!fulltoken || !fulltoken.startsWith("Bearer ")) {
        return resp.status(401).json({ status: false, msg: "No token provided or incorrect format" });
    }

    let actualtkn = fulltoken.split(" ")[1];

    try {
        let isvalidtoken = jwt.verify(actualtkn, process.env.SEC_KEY);
        
        if (isvalidtoken) {
            req.user = jwt.decode(actualtkn); // Attach decoded data to request
            console.log(req.user);
            next();
        } else {
            resp.status(401).json({ status: false, msg: "TOKEN EXPIRED" });
        }
    } catch (err) {
        console.log("JWT Verification Error:", err.message);
        resp.status(403).json({ status: false, msg: "Invalid token" });
    }
}

module.exports={ValidateTokenjs}