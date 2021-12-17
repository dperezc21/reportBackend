import {  Request, Response } from "express";
const Profile = require('../models/modelUserProfile');

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

const getProfiles = async(req:Request, res:Response) =>{
    try {
        const profiles = await Profile.find({pro_status:true});
        if(profiles){
            return res.json({
                status:200,
                message: profiles
            })
        }
        
        return res.json({
            status:802,
            message: "no hay perfiles de usuarios"
        })
    } catch (error) {
        console.log(error);
    }
}

const insertProfile = async( req:Request, res:Response) =>{
    try {
        const {pro_name} = req.query;
        console.log(pro_name)
        const profile = await Profile({pro_name});
        profile.save((err:any, profileInserted:any) => {
            if (err){
                return res.json({
                    status:500,
                    message:err.message
                });
            }

            return res.json({
                status: 200,
                message:"profile inserted"
            })
        });
        
    } catch (error) {
        return res.json({
            status: 500,
            message: error
        })
    }
}

export = {
    consultProfile,
    insertProfile,
    getProfiles
}

