import { Request, Response } from "express";
const getIdTypeService = require('../services/idTypeService/getIdTypesServices')
const insertIdTypeService = require('../services/idTypeService/insertIdTypeService')

class ControllerIdType {

    getIdTypes = async(req:Request, res:Response, next:any) =>{

        try {
            const response: object = await getIdTypeService();
            return res.status(200).json(response)
        } catch (error:any) {
            return res.status(500).json({
                status:500,
                message:error.message
            })
        }

    }

    insertIdTypes = async(req:Request, res:Response, next:any) =>{
        const paramtro:any = req.params.idType
        try {
            const response: object = await insertIdTypeService(paramtro);
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