import { Request, Response } from "express"
const generateCompanyCodeService = require( "../services/companyServices/generateCompanyCodeService");
const insertCompanyService =require( "../services/companyServices/insertCompanyService");
const getCompanyCodeService = require("../services/companyServices/getCompanyCodeService");
import getPercentajeChartService from "../services/companyServices/percentageChartService";

class ControllerCompany {

    //controlador para insertar compañia
    insertCompany = async(req:Request, res:Response) =>{
        let data: object = req.body;//datos para insertar obtenidos de la request
        try {
            const response: object = await insertCompanyService(data);
            return res.json(response);
            
        } catch (error) {
            console.log(error);
            return res.json({
                status:500,
                message:error
            })
        }
        
    }

    //controlador para generar nuevo codigo de la compañia
    generateCode = async(req:Request, res:Response) =>{
        
        try {
            const response: object = await generateCompanyCodeService();
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
        
    }

    getCompanyCode = async(req:Request, res:Response) => {
        try {
            const response: object = await getCompanyCodeService();
            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.json({
                status:500,
                message: error
            })
        }
    }

    getPercentajeChart = async(req:Request, res:Response) =>{
        const {com_id} = req.query;
        try {
            const response: object = await getPercentajeChartService(com_id);
            return res.json(response);
        } catch (error:any) {
            return res.json({
                status:500,
                message: error.message
            })
        }
    }
    
       
}


export = new ControllerCompany();
    
