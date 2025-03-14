const user = require("../Models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.VerifyToken =async (req,res,next) => {

    const token = req.headers.token;

    if(!token){
        return res.status(401).json({message : "Token is required!!"});
    }

    try {
        const decoded = jwt.verify(token , process.env.SECRET_KEY);

        const verifieduser =await  user.findById(decoded.Id);
        if(!verifieduser){
            return res.status(401).json({error : "User doesn't exist !!"});
        }

       //^passing data to next middleware
        req.user = verifieduser._id;
        next();
        
    } catch (error) {
        return res.status(401).json({err : error , message : "Invalid token"});
        
    }
}