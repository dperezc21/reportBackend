import { Request, Response } from "express"
const {
    getCompanyUserRepository,
    generateCompanyCode,
    deleteCompanyUserRepository,
    insertCompanyRepository,
    updateCompanyUserRepository} = require('../services/companyServices')

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