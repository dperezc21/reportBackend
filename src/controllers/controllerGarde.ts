import { Request, Response } from "express";
const getGardeService = require('../services/gardeService/getGardeServices')
const insertGardeService = require('../services/gardeService/insertGardeService')

class ControllerIdType {

    getGarde = async(req:Request, res:Response, next:any) =>{

        try {
            const response: object = await getGardeService();
            return res.json(response)
        } catch (error:any) {
            return res.json({
                status:500,
                message:error.message
            })
        }

    }

    insertGarde = async(req:Request, res:Response, next:any) =>{
        const paramtro:any = req.params.garde
        try {
            const response: object = await insertGardeService(paramtro);
            return res.json(response)
        } catch (error:any) {
            return res.json({
                status:500,
                message:error.message
            })
        }

    }
}

export = new ControllerIdType