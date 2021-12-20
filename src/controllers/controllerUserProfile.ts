import {  Request, Response } from "express";
const Profile = require('../models/modelUserProfile');
import getProfileService from "../services/profileService/getProfilesService"
import insertProfileService from "../services/profileService/insertProfileService"

class ControllerProfile {
    getProfiles = async(req:Request, res:Response) => {
        try {
            const response = await getProfileService();
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
            const response = await insertProfileService(pro_name);
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }
}


const consultProfile = async(pro_name:string) =>{
    try {
        const profile = await Profile.findOne({pro_name, pro_status:true});
        if(profile){
            return profile._id;
        }
        
        return null;
    } catch (error) {
        console.log(error);
    }
}


export = new ControllerProfile;
