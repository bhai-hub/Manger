import jwt from "jsonwebtoken"

const authMiddleware =(req,res,next)=>{

    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if(!token) return res.status(401).json({message:"Authorization denied, no token found"})

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next()
    }catch(error){
        res.status(401).json({ message: "Token is not valid" });
    }

}

export default authMiddleware