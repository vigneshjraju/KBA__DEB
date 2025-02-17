import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticate=(req,res,next)=>{
    const cookie=req.headers.cookie;
    console.log(cookie);

    if(!cookie){
        res.status(401).json({message:"please login"})
    }
    else{

        const [name,Token]=cookie.trim().split("=");
        console.log(name);
        console.log(Token);
        
        

        if(name=="authToken"){

            
            const verified=jwt.verify(Token,process.env.SECRET_KEY);
            console.log(verified);

            req.userid=verified.UserID;
            req.usermail=verified.Usermail;
            req.roole=verified.Role;

            next();
            
        }
        else{
            res.status(401).send("unauthorized Access")
        }

    }

}

export {authenticate}