import { Router } from "express";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {Jobseeker,Employer,usermodel} from "../Model/model.js";
// import { upload } from "../middleware/upload.js";

const user=Router();
dotenv.config()


user.post('/signup',async(req,res)=>{

    try{
    
            const{email,password,confirmpassword,address,userrole}=req.body;

            if (!email || !password || !confirmpassword || !userrole){
                res.status(400).send('Email, password,  confirm password and userrole are required.');
            }

            else{
                    
                    
                const sign=await usermodel.findOne({Email:email});

                    if(password==confirmpassword){

                        const newpassword=await bcrypt.hash(password,10)
                        
                        
                        if(sign){

                            res.status(400).send('User already exists.');

                        }
                        else{
                           

                            let newUser;
                                if (userrole === 'Jobseeker') {
                                        newUser = new Jobseeker({
                                            Email: email,
                                            Password: newpassword,
                                            Address: address,
                                            Role: userrole
                                    });
                                   
                                    
                                } 
                                else if (userrole === 'Employer') {
                                        newUser = new Employer({
                                            Email: email,
                                            Password: newpassword,
                                            Address: address,
                                            Role: userrole
                                    });
                                   
                                    

                                } 
                                else {
                                    return res.status(400).send('Invalid user role.');
                                }

                            console.log(newUser);
                            await newUser.save();
                             
                            res.status(201).json({ message: "User registered successfully", userId: newUser._id,role: newUser.Role});
                            
                            // const newUser =new usermodel({

                            //     Email:email,
                            //     Password:newpassword,
                            //     PhoneNumber:phonenumber,
                            //     Age:age,
                            //     Gender:gender,
                            //     Address:ad// Save user and respond


                        }


                    }
       
        
                    else{
                        res.status(400).send('Please type the same password in confirm password.')
                    }
                }

        }

        catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error.");
        }


})



user.patch("/signup/details/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { phonenumber, age, gender, about, education, experience, skills, companyname, aboutcompany, location,totaljobs,since } = req.body;

        // Find user by ID
        let user1 = await usermodel.findById(userId);
        if (!user1) {
            return res.status(404).json({ message: "User not found" });
        }
  
        // Update user details based on role
        if (user1.Role === "Jobseeker") {
            await Jobseeker.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        PhoneNumber: phonenumber,
                        Age: age,
                        Gender: gender,
                        About: about,
                        Education: education, // Ensure embedded objects are stored
                        Experience: experience,
                        Skills: skills,
                        
                    }
                },
                { new: true }  // Return updated document
            );
            res.status(200).json({ message: "Jobseeker details updated successfully" });
        } 
        
        else if (user1.Role === "Employer") {
            await Employer.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        CompanyName: companyname,
                        AboutCompany: aboutcompany,
                        Location: location,
                        TotalJobs: totaljobs,
                        Location: location,
                        Since:since
                    }
                },
                { new: true }
            );
            res.status(200).json({ message: "Employer details updated successfully" });
        }
  

  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
  });



  user.post("/login",async(req,res)=>{

    try{

        const {email,password}=req.body;

        // Check if email exists in any model (Jobseeker or Employer)
    let user = await Jobseeker.findOne({ Email: email });
    if (!user) {
      user= await Employer.findOne({ Email: email });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up." });
    }

    //Compare passwords
    const passwordmatch = await bcrypt.compare(password, user.Password);
    if (!passwordmatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    else{
        //Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.Role },process.env.SECRET_KEY,{ expiresIn: "7d" });

        res.cookie('authToken',token,
            {
                 httpOnly:true
            });

    //Return user details & token
    res.status(200).json({message: "Login successful",userId: user._id,role: user.Role,token: token,});
    console.log(token);
    }
    

    }

    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }


  })
  
  

export {user}