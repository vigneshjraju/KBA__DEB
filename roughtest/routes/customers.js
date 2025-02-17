import { Router } from "express";
import { authenticate } from "../middlewares/authentication.js";
import { customerchec } from "../middlewares/customerscheck.js";
import { servicesmodel } from "../models/services.js";

const customers=Router();

customers.post("/servicesbook/:servicesid",authenticate,async(req,res)=>{

    try{
    const {servicesid}=req.params;

    const customerid=req.userid

    console.log(customerid);
    
    
    

    const servicesetail=await servicesmodel.findById(servicesid);
    

    if(!servicesetail){
        res.status(401).json({message:"services not found"});

    }
    if(servicesetail.Customers.includes(customerid)){
        res.status(400).json({ message: "You have already booked for this services" });
    }
    else{
        
        
        servicesetail.Customers.push(customerid);
        console.log(servicesetail);
        await servicesetail.save();

        res.status(201).json({message:"successfully booked",service:servicesetail})
        
        
        

    }}
    catch(error){
        res.status(500).json({message:"Internal Server error"});

    }


})

export{customers}