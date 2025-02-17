import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { student } from "./routes/addstudent.js";

const app=express();
dotenv.config();
const PORT=process.env.PORT

app.use(json());
app.use("/",student)

app.listen(PORT,()=>{
    console.log(`Server is listening to PORT ${PORT}` );
    
})

mongoose.connect("mongodb://localhost:27017/StudentEnrollmentSystem").then(()=>{
    console.log("MongoDB connected successfully to StudentEnrollmentSystem");
    })
    .catch((error) => {
        console.error("MongoDB failed to connect to StudentEnrollmentSystem:", error);
    });