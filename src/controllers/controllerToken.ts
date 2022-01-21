import { Request, Response } from "express";
const validToken = require('../services/tokenService/verifyTokenService')


const verifyToken = async(req:Request, res:Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] || req.header('token');
        const response:object = await validToken(token);

        return res.json(response)
    } catch (error:any) {
        return res.json({
            status:500,
            message:error.message
        })
    }
}


export = verifyToken