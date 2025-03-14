const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../Models/user");
const dotenv = require("dotenv");

dotenv.config();


//!REGISTER USER 
exports.registeruser = async(req,res) => {
     const {fname,lname,role,email,password,confirmpassword} = req.body;
     console.log(password , confirmpassword);
     try{
    //^ Check Mail
     const checkmail = await user.findOne({email});
     if(checkmail){
        return res.status(400).json({
            status : "fail",
            message : "Email Already Taken!!"
        });
     }
     //^confirmpassword
     if(password !== confirmpassword){
        return res.status(400).json({
            status : "fail",
            message : "Password doesn't match!!"
        });
     }
     //^Hash password
     const hashedpassword =await bcrypt.hash(password,10);
     const newuser = new user({
        fname,
        lname,
        role,
        email,
        password : hashedpassword,
       
     });
      await newuser.save();
      res.status(201).json({
        status : "success",
        message : "User registered successfully!!"
      });
    }

    catch(err){
       
        res.status(500).json({
            error : "Internal server error adhi",
            message : {
                err
            }
        })
    }

}

//! Login User
exports.login = async (req,res) => {
     const {email , password , role} = req.body;
      try{
         const userdetails = await user.findOne({email}).select('+password');
         console.log(userdetails);
         
         //^ Check roles
         if(role !== userdetails.role){
             return res.status(401).json({
                status : "failed",
                message : "Roles mismatched!!"
             })
         }
        
         //^ Email and password verification
         if(!userdetails || !(await bcrypt.compare(password,userdetails.password))){
             return res.status(401).json({
                 status : "failed",
                 message : "Username or Password is incorrect!!"
             });
         }

         //^JWT Token
         const jwttoken = jwt.sign({Id : userdetails._id} , process.env.SECRET_KEY , {expiresIn : process.env.JWT_EXPIRES_IN});


        //^sucess message
         res.status(201).json({
            status : "Success",
            message:"Signed Successfully!",
            token : jwttoken
         })
      }

      catch(err){
        res.status(500).json({
            status : "failed",
            message:err
         })  
      }
}

//!Get all users
exports.getallusers = async (req,res) => {
    try{
      const allusers = await user.find().populate('event');
      res.status(200).json({
        status : "success",
        data : {
            allusers
        }
      });
    }
    catch(err){
        res.status(401).json({
            status : "failed",
            error : "unable to fetch all the users"
        });
    }
}

//!Get an single user
exports.getanuser = async(req,res) => {
    try{
        const singleuser = await user.findById(req.params.id).populate('event');
        //^error
        if(!singleuser){
           return res.status(401).json({
                status:"failed",
                error: "unable to fetch an user"
            });
        }
       //^ success
        res.status(200).json({
            status : "success",
            data : singleuser
        })
    
    }
    catch(err){
        res.status(500).json({
            status : "failed",
            message:"unable to fetch an user"
         }) 
    }
}