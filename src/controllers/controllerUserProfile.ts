import {  Request, Response } from "express";
import getProfileService from "../services/profileService/getProfilesService"
import insertProfileService from "../services/profileService/insertProfileService"

class ControllerProfile {
    getProfiles = async(req:Request, res:Response) => {
        try {
            const response: object = await getProfileService();
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }

    insertProfile = async(req:Request, res:Response) =>{
        const {pro_name} = req.query;
        try {
            const response: object = await insertProfileService(pro_name);
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }
}


export = new ControllerProfile;
