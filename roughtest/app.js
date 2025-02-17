import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { user } from './routes/userroute.js';
import adminmain from './routes/admin.js';
import { customers } from './routes/customers.js';

const app=express();
dotenv.config();
const PORT=process.env.PORT;

app.use(json());
app.use('/',user);
app.use('/',adminmain);
app.use('/',customers);

app.listen(PORT,()=>{
    console.log(`Server is listening to PORT ${PORT}`);

});

mongoose.connect("mongodb://localhost:27017/Rough").then(()=>{

    console.log("MongoDB successfully connected to Roughtest");

})
.catch((error)=>{
    console.error("MongoDB failed to  connect to Roughtest");
    
})

