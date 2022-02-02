import {  Request, Response } from "express";
import getProfileService from "../services/profileService/getProfilesService"
import insertProfileService from "../services/profileService/insertProfileService"

class ControllerProfile {

    //controlador para consultar los perfiles de usuario
    getProfiles = async(req:Request, res:Response) => {
        try {
            const response: object = await getProfileService();
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status:500,
                message:error
            })
        }
    }

    //controlador para insertar un perfil de usuario
    insertProfile = async(req:Request, res:Response) =>{
        const {pro_name} = req.query;//nombre del perfil de usuario obtenido de la request
        try {
            const response: object = await insertProfileService(pro_name);
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status:500,
                message:error
            })
        }
    }
}


export = new ControllerProfile;
