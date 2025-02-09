import { Router } from "express";
import authenticate from "../middleware/authentication.js";
import { employercheck } from "../middleware/employercheck.js";
import { usermodel } from "../Model/model.js";
import { jobmodel } from "../Model/postmodel.js";
import { notificationmodel } from "../Model/notificationmodel.js";


const employer=Router()

employer.post("/postjob",authenticate,employercheck,async(req,res)=>{

try{
    const {jobtitle,jobtype,genderpreferenece,qualification,salary,enddate}=req.body;

    const userId = req.userid ? req.userid : req.body.userId;

    const newJob = new jobmodel({
        JobTitle:jobtitle,
        JobType:jobtype,
        GenderPreference:genderpreferenece,
        Qualification:qualification,
        salary:salary,
        EndDate:enddate,
        PostedBy:userId,
        
    });

    await newJob.save();
    res.status(201).json({ message: "Job posted successfully", job: newJob });

} 
catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
}
    
    

})

employer.patch("/updatepostjob/:jobId",authenticate,employercheck,async(req,res)=>{

    try{
        const { jobId } = req.params; // Get job ID from URL

        const{jobdescription,responsibilities,requirements}=req.body;
        
        const job = await jobmodel.findById(jobId);

        if(job){

            job.JobDescription=jobdescription;
            job.Responsibilities=responsibilities;
            job.Requirements=requirements;
        
            await job.save();
            res.status(201).json({ message: "Job udated successfully", job: job });
        }
        else{
            res.status(401).json({ message: "Job not found"})
        }
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }

})

employer.get("/appliedcandidates",authenticate,employercheck,async(req,res)=>{

    try {
        const jobId = req.query.jobId;

        // Find the job and populate the Applicants field with user details
        const job = await jobmodel.findById(jobId).populate("Applicants", "Email PhoneNumber Age Education Experience Skills"); 
        // You can add more fields if needed

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ message: "Applied candidates retrieved successfully", applicants: job.Applicants });
    } catch (error) {
        console.error("Error fetching applicants:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

employer.delete("/deletejob",authenticate,employercheck,async(req,res)=>{


    try {
        const jobId = req.query.jobId;
        const employerId = req.userid; // Get employer ID from authentication middleware

        // Find the job
        const job = await jobmodel.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if the logged-in employer is the one who posted the job
        if (job.PostedBy.toString() !== employerId) {
            return res.status(403).json({ message: "Access denied. You can only delete jobs you posted." });
        }

        // Delete the job
        await jobmodel.findByIdAndDelete(jobId);
        res.status(200).json({ message: "Job deleted successfully" });
        
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }



})

employer.post("/updatestatus",authenticate,employercheck,async(req,res)=>{

    try {
        const { jobId, jobseekerId, status } = req.body;
        const employerId = req.userid; // Employer ID from token

        // Check if job exists
        const job = await jobmodel.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if the employer is the owner of the job
        if (job.PostedBy.toString() !== employerId) {
            return res.status(403).json({ message: "You are not authorized to update this job's applicants" });
        }

        // Create a notification for the jobseeker
        const notification = new notificationmodel({
            JobseekerID:jobseekerId,
            JobID:jobId,
            EmployerID:employerId,
            Status:status

        });
        console.log(notification);
        
        await notification.save();
        res.status(200).json({ message: `Application status updated to ${status}`, notification: notification });
    
    } 
    catch (error) {
        console.error("Error updating job application status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

})

employer.get('/employer/logout',(req,res)=>{

    res.clearCookie("authToken");
    res.status(201).json({message:"logout Successfully."})



})


export {employer}