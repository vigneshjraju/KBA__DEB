// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs"
// import { usermodel,Jobseeker,Employer } from "../Model/model.js";


// const sign = express.Router();

// // 🔹 Configure Multer for File Uploads

// // Ensure the directories exist before saving file


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         if (file.fieldname === "photo") {
//             cb(null, "uploads/photos/"); // Store photos in uploads/photos
//         } else if (file.fieldname === "resume") {
//             cb(null, "uploads/resumes/"); // Store resumes in uploads/resumes
//         }
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// const upload = multer({ storage: storage });

// // 🔹 Update Jobseeker Details Route (with Photo & Resume Uploads)
// sign.patch("/signup/details/:userId", upload.fields([{ name: "photo" }, { name: "resume" }]), async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { phonenumber, age, gender, about, education, experience, skills, companyname, aboutcompany, location, totaljobs, since } = req.body;
        
//         // Get uploaded files
//         const photoPath = req.files["photo"] ? req.files["photo"][0].path : null;
//         const resumePath = req.files["resume"] ? req.files["resume"][0].path : null;

//         // Find user by ID
//         let user1 = await usermodel.findById(userId);
//         if (!user1) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Update user details based on role
//         if (user1.Role === "Jobseeker") {
//             await Jobseeker.findByIdAndUpdate(
//                 userId,
//                 {
//                     $set: {
//                         PhoneNumber: phonenumber,
//                         Age: age,
//                         Gender: gender,
//                         About: about,
//                         Education: education,
//                         Experience: experience,
//                         Skills: skills,
//                         Photo: photoPath,   // Save photo if uploaded
//                         Resume: resumePath  // Save resume if uploaded
//                     }
//                 },
//                 { new: true } // Return updated document
//             );
//         } else if (user1.Role === "Employer") {
//             await Employer.findByIdAndUpdate(
//                 userId,
//                 {
//                     $set: {
//                         CompanyName: companyname,
//                         AboutCompany: aboutcompany,
//                         Location: location,
//                         TotalJobs: totaljobs,
//                         Since: since
//                     }
//                 },
//                 { new: true }
//             );
//         }

//         res.status(200).json({ message: "User details updated successfully" });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error", error });
//     }
// });

// export {sign};
