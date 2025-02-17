import { Schema } from "mongoose";
import { model } from "mongoose";


const userschema=new Schema({

    Email:{type:String,unique:true,required:true},
    Password:{type:String,required:true},
    Address:{type:String},
    UserRole:{type:String,enum:['Customer','Admin'],required:true}

});

const newuser=model('Users',userschema)

export {newuser}