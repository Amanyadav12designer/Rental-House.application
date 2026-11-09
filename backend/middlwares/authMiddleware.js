const jwt= require("jsonwebtoken");


exports.protect= async(req,res,next)=>{
try{
 const authHeader= req.headers.authorization;

    if(!authHeader||!authHeader.startsWith("Bearer ")){

return res.status(401).json({message:"Authentication failed, no token provided"});

    }


    const token = authHeader.split(" ")[1];

    const decoded= jwt.verify(token, process.env.JWT_SECRET);

    req.user={userId:decoded.userId,role:decoded.role}

return next();

} catch (error) {

    return res.status(401).json({message:"Authentication failed, invalid token"});
}

}


exports.allowLandlord= async(req,res,next)=>{

    if(req.user.role!=="landlord"){
        return res.status(403).json({message:"Access denied, only landlords are allowed"});
    }
    next();
}