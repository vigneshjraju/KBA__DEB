
import {Schema} from "mongoose";
import { model } from "mongoose" ;

const userSchema=new Schema({

    Email:{type:String},
    Password:{type:String},
    Address:{type:String},
    Role:{type:String,enum:["Jobseeker","Employer"],}

    },
    {
    discriminatorKey:"Role",
    timestamps:true
    });

const usermodel=model('usersignin',userSchema);



const jobseekerSchema=new Schema({

    PhoneNumber:{type:Number},
    
    Photo:{type:String},
    
    Age:{type:Number},
    
    Gender: {type:String, enum:["Male", "Female"] },
    
    About:{type:String},
    
    Education:{type:Array},
    
    Experience: {type:Array},
    
    Skills: {type:String},
    
    Resume:{type:String}
    

},{ _id: false })

const Jobseeker = usermodel.discriminator('Jobseeker', jobseekerSchema);



const employerSchema = new Schema({

    CompanyName: {type:String},

    Photo:{type:String},

    AboutCompany: {type:String},

    Location: {type:String},

    TotalJobs: {type:String},

    Since:{type:String}
  });
  
  const Employer = usermodel.discriminator('Employer', employerSchema);
  



export {usermodel,Jobseeker,Employer}