import { Request, Response } from "express";
const User = require('../../models/modelUser');
const Company = require('../../models/modelCompany');
const UserProfile = require('../../models/modelUserProfile');
const encript = require('bcryptjs');

const insertUserRepository = async(dataUser: any) => {
    let {com_code, user_name, user_password} = dataUser;
    //console.log("datos de usuario", dataUser)
    try {
        const company = await Company.findOne({com_code,com_status:true});
        
        const searchUser = await User.findOne({user_name, user_status:true});
            
        if(searchUser){
            return {
                status:701,
                message:"nombre de usuario ya existe"};
        }
        const pro_name="user";
        const profile = await UserProfile.findOne({pro_name});
        if (!profile){
            return {
                status:800,
                message:"perfil de usuario no existe"
            };
        }

        const salt = encript.genSaltSync();
        user_password = encript.hashSync(user_password, salt);
        const com_id = company._id; 
        const pro_code = profile._id;
        const user = await User({com_id, user_name, user_password, pro_code});
        user.save((error:any, product:any) => {
            if(error){
                return {
                    status:500,
                    message:error.message
                };
            }
        });
        return {
            status:200,
            message:"user inserted"
        };
    } catch (error) {
        return {
            status:500,
            message:error
        }
    }
}

export = insertUserRepository
