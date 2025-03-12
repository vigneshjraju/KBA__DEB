import { Schema } from "mongoose";
import { model } from "mongoose";

const student=new Schema({
    STUDENTNAME:{type:String,required:true},
    ENROLLMENTNUMBER:{type:Number,required:true,unique:true},
    COURSE:{type:String},
    DATEOFENROLLMENT:{type:String}
})

const studentmodel=model("student",student)

export {studentmodel}