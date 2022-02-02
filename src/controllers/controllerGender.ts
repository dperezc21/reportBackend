import { Request, Response } from "express";
const getGenderService = require('../services/genderService/getGenderServices')
const insertGenderService = require('../services/genderService/insertGenderService')

class ControllerIdType {

    getGender = async(req:Request, res:Response, next:any) =>{

        try {
            const response: object = await getGenderService();
            return res.status(200).json(response)
        } catch (error:any) {
            return res.status(500).json({
                status:500,
                message:error.message
            })
        }

    }

    insertGender = async(req:Request, res:Response, next:any) =>{
        const paramtro:any = req.params.garde
        try {
            const response: object = await insertGenderService(paramtro);
            return res.status(200).json(response)
        } catch (error:any) {
            return res.status(500).json({
                status:500,
                message:error.message
            })
        }

    }
}

export = new ControllerIdType