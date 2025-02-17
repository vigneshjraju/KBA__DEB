import { Schema } from "mongoose";
import { model } from "mongoose";

const servicesschema=new Schema({

    ServiceName:{type:String,required:true},
    Description:{type:String},
    PostedBy:{type:Schema.Types.ObjectId,ref:"users",required:true},
    Customers:[{type:Schema.Types.ObjectId,ref:"users",required:true}]

})

const servicesmodel=model("Services",servicesschema)

export {servicesmodel}