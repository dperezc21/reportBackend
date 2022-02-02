import { Request, Response } from "express"
const generateCompanyCodeService = require( "../services/companyServices/generateCompanyCodeService");
const insertCompanyService =require( "../services/companyServices/insertCompanyService");
const getCompanyCodeService = require("../services/companyServices/getCompanyCodeService");


class ControllerCompany {

    //controlador para insertar compañia
    insertCompany = async(req:Request, res:Response) =>{
        let data: object = req.body;//datos para insertar obtenidos de la request
        try {
            const response: object = await insertCompanyService(data);
            return res.status(200).json(response);
            
        } catch (error) {
            //console.log(error);
            return res.status(500).json({
                status:500,
                message:error
            })
        }
        
    }

    //controlador para generar nuevo codigo de la compañia
    generateCode = async(req:Request, res:Response) =>{
        
        try {
            const response: object = await generateCompanyCodeService();
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                status:500,
                message:error
            })
        }
        
    }

    getCompanyCode = async(req:Request, res:Response) => {
        try {
            const response: object = await getCompanyCodeService();
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status:500,
                message: error
            })
        }
    }

    
    
       
}


export = new ControllerCompany();
    
