import { Request, Response } from "express"
const getCompanyUserRepository = require( "../services/companyServices/getCompanyUserService");
const generateCompanyCode = require( "../services/companyServices/generateCompanyCodeService");
const deleteCompanyUserRepository = require( "../services/companyServices/deleteCompanyUserService");
const insertCompanyRepository =require( "../services/companyServices/insertCompanyService");
const updateCompanyUserRepository =require( "../services/companyServices/updateCompanyUserService");

class ControllerCompany {
    insertCompany = async(req:Request, res:Response) =>{
        let data = req.body;
        try {
            const response =await insertCompanyRepository(data);
            return res.json(response);
            
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
        
    }

    getCompanyUser = async(req:Request, res:Response) =>{
        const query = req.query;
        try {
            const response = await getCompanyUserRepository(query);
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
            const response = await generateCompanyCode();
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }

    }

    deleteCompanyUser = async(req:Request, res:Response) => {
        const {ids} = req.body;
        try {
            const response =  await deleteCompanyUserRepository(ids);
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }

    } 

    updateCompanyUser = async(req:Request, res:Response) =>{
        let data = req.body;
        const query = req.query;

        try {
            const response = await updateCompanyUserRepository(query);
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
    
