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
        const user =await modelUser.find({com_id:company._id,user_status:true}).count();
        //console.log("Numero de usuarios",user)
        if(user == configUser.number_users){
            return res.json({status:705,message:`usuario no insertado... maxima cantidad de usuarios por compañia permitidos 5`});
        } 
        req.body.com_id = company._id
        next();
    } catch (error) {
        console.log(error)
        return res.json({status:500, message:error});
    }
}

export = validNumberUser