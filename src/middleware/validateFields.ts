import { Request, Response } from "express";
const Company = require('../models/modelCompany')
const User = require('../models/modelUser');
const {getAuthUser} = require('../middleware/verifyToken')

class ValidFiels {

    validRol = (req:Request, res:Response, next:any) =>{
        const {pro_code} = getAuthUser();
        const rol = pro_code["pro_name"];
        
        if ( rol != 'admin'){
            return res.json({
                status:401,
                message:"rol no permitido"});
        }
        next();
    }
    
    validCompanyName = async(req:Request, res:Response, next:any) =>{
        let {company} = req.body;
        const com_name = company.com_name.toLowerCase()
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
            req.body.company.com_name = com_name;
            next();
            
        } catch (error) {
            console.log(error);
            return res.json({
                status:500,
                message:error});
        }
    }
    
    validUserName = async(req:Request, res:Response, next:any) =>{
        let {user} = req.body;
        const user_name = user.user_name.toLowerCase();
        try {
            if (!user_name ){
                return res.json({
                    status:423,
                    message:"nombre de usuario requerido"})
            }
    
            const searchUser = await User.findOne({user_name});
                
            if(searchUser){
                return res.json({
                    status:701,
                    message:"nombre de usuario ya existe"});
            }
            req.body.user.user_name = user_name.toLowerCase()
            next();
            
        } catch (error) {
            console.log(error);
            return res.json({
                status:500,
                message:error});
        }
    }
    
    validPassword = (req:Request, res:Response, next:any) => {
        const {user, user_password} = req.body;
        
        if (!user?.user_password && !user_password){
            return res.json({
                status:424,
                message:"contraseña de usuario requerido"});
        }
        next();
    }

    validFieldUpdateUser(req:Request, res:Response, next:any){
        const data = req.body;
        for (const key in data) {
            if(data[key] == "") {
                return res.json({
                    status:400,
                    message:"hay campos vacios"
                })
            }
        }
        next();
    }

    
}

export = new ValidFiels();