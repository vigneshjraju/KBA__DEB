// import multer from "multer";
// import path from "path";

// //Configure Multer for File Uploads
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

// export {upload}