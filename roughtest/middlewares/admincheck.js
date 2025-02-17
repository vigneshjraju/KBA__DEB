import { newuser } from "../models/usermodel.js";

const adminchec=async(req,res,next)=>{

    const useris=req.userid ? req.userid : req.body.userid;

    try{
        const user=await newuser.findById(useris)
        console.log(user);
    

        if(!user){
            res.status(403).json({message:"User not found"})
        }
        if(user.UserRole!== "Admin"){
            return res.status(403).json({ message: "Access denied. Only Employers are allowed." });
        }

        else{
            next();
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }

}

export {adminchec}