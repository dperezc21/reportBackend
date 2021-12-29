import { Request, Response } from "express"
const generateCompanyCode = require( "../services/companyServices/generateCompanyCodeService");
const insertCompanyRepository =require( "../services/companyServices/insertCompanyService");

class ControllerCompany {
    insertCompany = async(req:Request, res:Response) =>{
        let data: object = req.body;
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
    
