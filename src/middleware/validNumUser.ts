import { Request, Response } from "express";
const { configUser } = require( "../helpers/dataConfig");
import CompanyInterface from "../interfaces/companyInterface";
import modelCompany from "../models/modelCompany";
import modelUser from "../models/modelUser";

const validNumberUser = async(req:Request, res:Response, next:any) => {
    try {
        const {com_code} = req.body;
        const company: CompanyInterface = await modelCompany.findOne({com_code,com_status:true});
        if(!company){
            return res.json({
                status:604,
                message:"codigo de compañia invalido"});
        }
        const user =await modelUser.find({com_id:company._id});
        console.log("Numero de usuarios",user.length, "usuarios permitidos",configUser.number_users)
        if(user.length <= configUser.number_users-1 ){
            
            req.body.com_id = company._id
            next();
            return;
        } 
        return res.json({status:705,message:`usuario no insertado... maxima cantidad de usuarios por compañia permitidos 5`});
    } catch (error) {
        console.log(error)
        return res.json({status:500, message:error});
    }
}

export = validNumberUser