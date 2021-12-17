import { Request, Response } from "express"
const generate_token = require("../helpers/createToken");
const encript = require('bcryptjs')
const User = require('../models/modelUser')

class LoginUser {
    
    loginUser = async(req:Request, res:Response) =>{
        const data = req.body;
        data.user_status = true;
        console.log(data);
        try {
            const user = await User.findOne({user_name:data.user_name, user_status:true})
                                   .populate('pro_code')
                                   .populate('com_id',['com_name']);
            if (!user){
               return res.json({status:423, message:"usuario incorrecto"})
            }
            console.log(user)
            const validPassword = encript.compareSync(data.user_password, user.user_password);
            if (!validPassword){
                return res.json({status:424, message:'contraseña incorrecta'});
            }
            
            const token = await generate_token(user._id, data.user_name);
            return res.json({status:200, message:user, "token":token});
        } catch (error:any) {
            console.log(error)
            return res.json({status:500, message:error})
        }
    }

}


export = new LoginUser;
