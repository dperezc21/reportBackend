import { Request, Response } from "express";
import modelToken from "../models/modelToken";
import verifyTokenService from "../services/tokenService/verifyTokenService";


class ControllerToken {

    verifyToken = async(req: Request, res: Response) => {
        const token = req.headers.authorization?.split(' ')[1] || req.header('token');
        try {
            const getToken: any = await verifyTokenService(token);
            return res.json(getToken)
        } catch (error:any) {
            return res.json({
                status:500,
                message:error.message
            })
        }
    }

}

export = new ControllerToken
