
import {Schema} from "mongoose";
import { model } from "mongoose";


const jobschema=new Schema({
    
    JobTitle:{type:String,},
    JobType:{type:String,},
    GenderPreference:{type:String},
    Qualification:{type:String},
    Salary:{type:Number},
    EndDate:{type:String},
    JobDescription: { type: String },
    Responsibilities: { type: String },
    Requirements: { type: String },
    PostedBy: { type:Schema.Types.ObjectId, ref: "usersignin", required: true }, // Employer reference
    Applicants: [{ type:Schema.Types.ObjectId, ref: "usersignin", required: true }] // List of jobseeker IDs

    },
    {
    timestamps:true
    });

const jobmodel=model('Jobs',jobschema);

export {jobmodel}