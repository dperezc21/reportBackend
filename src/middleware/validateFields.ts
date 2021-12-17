import { Request, Response } from "express";
const Company = require('../models/modelCompany')
const User = require('../models/modelUser')


const validRol = (req:Request, res:Response, next:any) =>{
    const {pro_code} = req.body.user;
    
    const rol = pro_code["pro_name"];
    
    if ( rol != 'admin'){
        return res.json({
            status:401,
            message:"rol no permitido"});
    }
    next();
}

const validCompanyName = async(req:Request, res:Response, next:any) =>{
    const {com_name} = req.body;
    try {
        if (com_name.length<3 || !com_name){
            return res.json({
                status:606, 
                message:"nombre de la compañia muy corto"});
        }
        const consultCompanyByName = await Company.findOne({com_name});
        if(consultCompanyByName){
            return res.json({
                status:603,
                message:"compañia existe en la base de datos"});
        }
        next();
        
    } catch (error) {
        return res.json({
            status:500,
            message:error});
    }
}

const validUserName = async(req:Request, res:Response, next:any) =>{
    let {user_name} = req.body;
    try {
        if (!user_name){
            return res.json({
                status:423,
                message:"nombre de usuario requerido"})
        }
        next();
        
    } catch (error) {
        res.json({
            status:500,
            message:error});
    }
}

const validPassword = (req:Request, res:Response, next:any) => {
    const {user_password} = req.body;
    if (!user_password){
        return res.json({
            status:424,
            message:"contraseña de usuario requerido"});
    }
    next();
}

export = {
    validRol,
    validCompanyName,
    validUserName,
    validPassword
};