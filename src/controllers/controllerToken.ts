import { Request, Response } from "express";
import modelToken from "../models/modelToken";
import getTokenService from "../services/tokenService/getTokenService";


class ControllerToken {

    verifyToken = async(req: Request, res: Response) => {
        const token = req.body.token
        try {
            const getToken: any = await getTokenService(token);
            if( getToken.token){
                
            }
        } catch (error:any) {
            return res.json({
                status:500,
                message:error.message
            })
        }
    }

}

export = new ControllerToken
