import { Request, Response } from "express";
const { JSON_WEB_TOKEN_KEY } =require( "../../config");
import UserInterface from "../interfaces/userInterface";
const User = require("../models/modelUser");
const jwt = require('jsonwebtoken');

class JWT {

    user = {};
    verifiyJWT = (req:Request, res:Response, next:any) =>{
        const token = req.headers.authorization?.split(' ')[1] || req.header('token');
        console.log("headers",req.headers);
        console.log("body",req.body);
	    console.log("parametros", req.params);
	    console.log("queries", req.query)
        
        if(!token){
            return res.status(400).json({status:401,message:"required token"});
        }
    
        jwt.verify(token, JSON_WEB_TOKEN_KEY, async(err:any, payload:any ) =>{
            if(err){
                return res.json({
                    status:401,
                    message:err.message});
            }
            const {uid, user_name} = payload;
            const userLogin: UserInterface = await User.findOne({_id:uid, user_name}).populate('pro_code');
            if (!userLogin){
                return res.status(401).json({status:401,message:'access invalid'});
            }
            this.user = userLogin;
            next();
        })
    }

    getAuthUser = () =>{
        return this.user;
    }

 }

export = new JWT();