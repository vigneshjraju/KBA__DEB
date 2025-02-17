import { Router } from "express";
import { authenticate } from "../middlewares/authentication.js";
import { adminchec } from "../middlewares/admincheck.js";
import { servicesmodel } from "../models/services.js";

const adminmain=Router();

adminmain.post("/addservice",authenticate,adminchec,async(req,res)=>{
    
    try{

        const{service,description}=req.body;
        const userid=req.userid ? req.userid : req.body.userid;

        const services1=await servicesmodel.findOne({ServiceName:service});

        if (services1){
            res.status(401).json({message:"Service already exists",service:services1});
        }
        else{
            const newservices=new servicesmodel({
                ServiceName:service,
                Description:description,
                PostedBy:userid


            })

            await newservices.save();
            res.status(201).json({message:"Service created successfully",service:newservices});
        }
 
    }
    catch(error){
        res.status(500).json({message:"Internal Server error"});

    }


    
})
export default adminmain