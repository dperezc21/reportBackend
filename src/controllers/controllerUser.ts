import { Request, Response } from "express";
import generate_token from "../helpers/createToken";
const encript = require('bcryptjs');
const Company = require( "../models/modelCompany");
const UserProfile = require('../models/modelUserProfile');

const User = require('../models/modelUser')

const insertUser = async(req:Request, res:Response) => {
    let {com_code, user_name, user_password} = req.body;
    console.log("datos de usuario", req.body)
    try {
        const company = await Company.findOne({com_code,com_status:true});
        
        const searchUser = await User.findOne({user_name, user_status:true});
            
        if(searchUser){
            return res.json({
                status:701,
                message:"nombre de usuario ya existe"});
        }
        const pro_name="user";
        const profile = await UserProfile.findOne({pro_name});
        if (!profile){
            return res.json({
                status:800,
                message:"perfil de usuario no existe"});
        }

        const salt = encript.genSaltSync();
        user_password = encript.hashSync(user_password, salt);
        const com_id = company._id; 
        const pro_code = profile._id;
        const user = await User({com_id, user_name, user_password, pro_code});
        user.save((error:any, product:any) => {
            if(error){
                return res.json({
                    status:500,
                    message:error.message});
            }else{
                return res.json({
                    status:200,
                    message:"user inserted"});
            }
        });
        
    } catch (error) {
        return res.json({
            status:500,
            message:error})
    }
}
        
        // const getUsers = async(req:Request, res:Response) => {
        //     const {pro_code} = req.body.user;
        //     try {
        //         const users = await User.find({user_status:true, pro_code}).limit(5).populate('com_id').populate('pro_code')
        //         if (!users){
        //             return res.json({message:"there is not users"})
        //         }else{ 
        //             Object.keys(users).forEach(key => {
        //                 users[key].user_password = null;
        //             })
        //             return res.json({users});
        //         }
        //     } catch (error) {
        //         return res.json({message:error})
        //     }
        // }
        
        // const deleteUser = async(req:Request, res:Response) =>{
//     const data = req.body;
//     data.user_status = true
//     try {
//         const user = await User.findOneAndUpdate(data, {user_status:false},{new:true})
//         if (user){
//             return res.json({
//                 status:200,
//                 message:"user deleted"})
//         }
//         return res.json({
//             status:400,
//             message:"user don't exists"})
        
//     } catch (error) {
//         console.log(error);
//         return res.json({
//             status:500,
//             message:error})
//     }

// }

export = {
    insertUser
}