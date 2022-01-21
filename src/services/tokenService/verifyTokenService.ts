import UserInterface from "../../interfaces/userInterface";
const User = require("../models/modelUser");
const jwt = require('jsonwebtoken');

const validToken = (token:string) => {
    try {

        jwt.verify(token, process.env.JSON_WEB_TOKEN_KEY, async(err:any, payload:any ) =>{
            if(err){
                return {
                    status:401,
                    message:err.message};
            }
            
                return {status:200,message:'token valido'};
            
        })
        
    } catch (error:any) {
        return {
            status:500, message:error.message 
        }
    }
}

export = validToken