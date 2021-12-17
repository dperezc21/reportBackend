import { Request, Response } from "express";
import modelCompany from "../models/modelCompany";
import modelUser from "../models/modelUser";

const validNumberUser = async(req:Request, res:Response, next:any) => {
    try {
        const {com_code} = req.body;
        const company = await modelCompany.findOne({com_code,user_status:true});
        if(!company){
            return res.json({
                status:604,
                message:"codigo de compañia invalido"});
        }
        const user =await modelUser.find({com_id:company._id,user_status:true}).count();
        console.log(user)
        if(user <= 6){
            next();
        }    
        return res.json({message:"numero de usuarios exedidos"});
    } catch (error) {
        console.log(error)
        return res.json({status:500, message:error});
    }
}

export = validNumberUser