import { Router } from "express";
import authenticate from "../middleware/authentication.js";
import { jobmodel } from "../Model/postmodel.js";
import { jobseekercheck } from "../middleware/jobseekercheck.js";
import { notificationmodel } from "../Model/notificationmodel.js";

const jobseeker=Router();

jobseeker.post("/apply",authenticate,jobseekercheck,async(req,res)=>{

    try {
        const jobId = req.query.jobId;
        const jobseekerId = req.userid; // Retrieved from authentication middleware

        // Find the job
        const job = await jobmodel.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Prevent duplicate applications
        if (job.Applicants.includes(jobseekerId)) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }

        // Add jobseeker's ID to the Applicants array
        job.Applicants.push(jobseekerId);
        await job.save();

        res.status(200).json({ message: "Job application submitted successfully" });

    } catch (error) {
        console.error("Error applying for job:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

jobseeker.get("/viewjobs",authenticate,jobseekercheck,async(req,res)=>{

    try {
        const jobs = await jobmodel.find().populate("PostedBy", "JobTitle EndDate JobDescription"); // Show employer's name & email

        res.status(200).json({message: "Jobs retrieved successfully",jobs});

    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }


})

jobseeker.get("/jobseeker/notifications",authenticate,async(req, res)=>{

    try {
        const seekerId = req.userid? req.userid:req.body.userid; // Get jobseeker ID from token

        // Fetch notifications related to the jobseeker
        const notifications = await notificationmodel.find({ JobseekerID:seekerId }).populate("JobID", "JobTitle");
 
        if(notifications){
            
        res.status(200).json({ message: "Notifications retrieved successfully", notifications});
        console.log(notifications);
        

        }
        else{
            res.status(400).json({ message: "userid validation failed",notifications: []});
        }


    } 
    catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

})

jobseeker.get('/jobseeker/logout',(req,res)=>{

    res.clearCookie("authToken");
    res.status(201).json({message:"logout Successfully."})



})

export {jobseeker}