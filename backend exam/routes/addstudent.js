import { Router } from "express";
import { studentmodel } from "../models/studentmodel.js";

const student=Router();

student.post("/addstudent",async(req,res)=>{

    try{
        const{studentname,enrollmentnumber,course,dateofenrollement}=req.body

        const student=await studentmodel.findOne({ENROLLMENTNUMBER:enrollmentnumber})

        if(student){
            res.status(401).json({message:"student already added",student:student})
        }

        else{

            const newstudent=new studentmodel({
                STUDENTNAME:studentname,
                ENROLLMENTNUMBER:enrollmentnumber,
                COURSE:course,
                DATEOFENROLLMENT:dateofenrollement



            })

            await newstudent.save();

            res.status(201).json({message:"student successfully added",student:newstudent})
            console.log(student);

        }}
    catch(error){
        res.status(500).json({message:"Internal Server error"})
    }


})

student.get("/getstudents",async(req,res)=>{

    const course1=req.query.courseNAME

    try{
        
        
        const students=await studentmodel.find({COURSE:course1})
        
        
        
    if(!students){
        res.status(401).json({message:"student is not added"})

    }
    else{

        res.status(201).json({message:"students successfully fetched",students})
    }
    }
    catch(error){
        res.status(500).json({message:"Internal Server error"})
    }
    
})

student.patch("/updatestudent",async(req,res)=>{

    
    
    const{enrollmentnumber,course,dateofenrollement}=req.body;
    
    
    try{
        const student1=await studentmodel.findOne({ENROLLMENTNUMBER:enrollmentnumber});

        if(!student1){
        res.status(403).json({message:"student not added"})
        }
        else{
            student1.ENROLLMENTNUMBER=enrollmentnumber,
            student1.COURSE=course,
            student1.DATEOFENROLLMENT=dateofenrollement

            await student1.save();
            res.status(201).json({message:"students details updated successfully",students:student1})
    
        }

    }
    catch(error){
        res.status(500).json({message:"Internal Server error"})
    }
    

})

student.delete("/delete/:studentID",async(req,res)=>{

    try{
        const{studentID}=req.params;

        const student1=await studentmodel.findByIdAndDelete(studentID)

        if(!student1){

        res.status(401).json({message:"students not found"})
        }
        else{
            res.status(201).json({message:"students deleted successfully."})
        }

        
        

    }
    catch(error){
        res.status(500).json({message:"Internal Server error"})
    }

})

export {student}