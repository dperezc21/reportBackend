import { Request, Response } from "express"
const generateCompanyCode = require( "../services/companyServices/generateCompanyCodeService");
const insertCompanyRepository =require( "../services/companyServices/insertCompanyService");

class ControllerCompany {

    //controlador para insertar compañia
    insertCompany = async(req:Request, res:Response) =>{
        let data: object = req.body;//datos para insertar obtenidos de la request
        try {
            const response: object = await insertCompanyRepository(data);
            return res.json(response);
            
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
        
    }

    //controlador para generar nuevo codigo de la compañia
    generateCode = async(req:Request, res:Response) =>{
        
        try {
            const response: object = await generateCompanyCode();
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
        
    }
    
       
}


export = new ControllerCompany();
    
