import { Router } from "express";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { newuser } from "../models/usermodel.js";


const user=Router();
dotenv.config();

user.post("/signup",async(req,res)=>{

   
    const {email,password,address,userrole}=req.body;
    
    

    try{
        const existinguser=await newuser.findOne({Email:email});

        
        

        if (existinguser){
            res.status(401).json({message:"User already exists.",user:existinguser});
            console.log("already exists");
            
        

        }
        else{
            const newpassword=await bcrypt.hash(password,10);

            const usersign=new newuser({
                Email:email,
                Password:newpassword,
                Address:address,
                UserRole:userrole

            })
            
            
            console.log(usersign);
            
            await usersign.save();
            
            res.status(201).json({message:"User successfully created.",user:usersign});

        }

    }
    catch(error){
        res.status(500).json({message:"Internal Server error."});
    }

    



})

user.post("/login",async(req,res)=>{

    const {email,password}=req.body;

    try{   
        const existinguser=await newuser.findOne({Email:email});

        if(!existinguser){
            res.status(500).json({message:"Please Login."});
        }
        else{

            const comparepass=await bcrypt.compare(password,existinguser.Password);
            
            

            if(comparepass){
                
                const token=jwt.sign({UserID:existinguser._id,Usermail:existinguser.Email,Role:existinguser.UserRole},process.env.SECRET_KEY,{expiresIn:"7d"})

                res.cookie('authToken',token,
                    {
                        httpOnly:true
                    });
                    
                res.status(201).json({message:"Login Successful.",user:existinguser,token:token});


                
                

            }
        }
    }
    catch(error){
        res.status(500).json({message:"Internal Server error.",error:error});
    }



})
export {user}