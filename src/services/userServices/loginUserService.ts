const {configUser} = require('../../helpers/dataConfig');
import Userinterface from "../../interfaces/userInterface";
import insertTokenService from "../tokenService/insertTokenService";

const generate_token = require("../../helpers/createToken");
const encript = require('bcryptjs')
const User = require('../../models/modelUser')
// const companyInterface = require('../../interfaces/userInterface')

    
const loginUserRepository = async(data:any) =>{
       
        console.log(data);
        data.user_name = data.user_name.toLowerCase();
        try {
            let user: Userinterface = await User.findOne({user_name:data.user_name, user_status:true})
                                   .populate('pro_code')
                                   .populate('com_id',['com_name'])
                                   .populate('user_id_type')
                                   .populate('user_sexo');
            if (!user){
               return {
                   status:423, message:"usuario incorrecto"
                }
            }

            if(user.pro_code.pro_name != configUser.pro_name){
                user = await User.findOne({user_name:data.user_name, user_status:true})
                                   .populate('pro_code')
                                   .populate('com_id',['com_name', 'com_code'])
                                   .populate('user_id_type')
                                   .populate('user_sexo');
            }
            const validPassword: string = encript.compareSync(data.user_password, user.user_password);
            if (!validPassword){
                return {status:424, message:'contraseña incorrecta'
                };
            }
            
            const token: string = await generate_token(user._id, data.user_name);
            await insertTokenService(token, user._id);
            return {
                status:200, message:user, token
            };
        } catch (error:any) {
            console.log(error)
            return {
                status:500, message:error
            }
        }
    }

export = loginUserRepository;
