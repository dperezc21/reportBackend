import { Request, Response } from "express";
const User = require("../models/modelUser");
const jwt = require('jsonwebtoken');

class JWT {
    user = "";

    verifiyJWT = (req:Request, res:Response, next:any) =>{
        const token = req.headers.authorization?.split(' ')[1] || req.header('token');
        console.log("headers",req.headers);
        
        if(!token){
            return res.json({status:401,message:"required token"});
        }
    
        jwt.verify(token, process.env.JSON_WEB_TOKEN_KEY, async(err:any, payload:any ) =>{
            if(err){
                return res.json({
                    status:401,
                    message:err.message});
            }
            const {uid, user_name} = payload;
            const user = await User.findOne({_id:uid, user_name})
                                   .populate('pro_code')
                                   
            if (!user){
                return res.json({status:401,message:'access invalid'});
            }
            this.user = user;
          
            console.log("body",req.body);
            next();
        })
    }

    getAuthUser = () =>{
        return this.user;
    }

 }

export =new JWT;