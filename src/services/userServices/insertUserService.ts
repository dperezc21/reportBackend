
import GenderInterface from "../../interfaces/genderInterface";
import IdTypeInterface from "../../interfaces/idTypeInterface";
import UserInterface from "../../interfaces/userInterface";
import UserProfileInterface from "../../interfaces/userProfileInterface";
import modelGarde from "../../models/modelGender";
import modelIdType from "../../models/modelIdType";

const User = require('../../models/modelUser');
const UserProfile = require('../../models/modelUserProfile');
const encript = require('bcryptjs');
const {configUser} = require('../../helpers/dataConfig');

const insertUserRepository = async(dataUser: any) => {
    console.log(dataUser)
    let {com_id, user_name, user_password, user_id_type, gender_id, ...data} = dataUser;
  
    try {
        const profile:UserProfileInterface = await UserProfile.findOne({pro_name:configUser.pro_name, pro_status:true});
        if (!profile){
            return {
                status:800,
                message:"perfil de usuario no existe"
            };
        }
        const idType: IdTypeInterface = await modelIdType.findOne({_id:user_id_type})
        if(!idType){
            return {
                status:400,
                message:"no existe tipo de identificacion"
            }
        }

        const gender: GenderInterface = await modelGarde.findOne({_id:gender_id})
        if(!gender){
            return {
                status:400,
                message:"genero no existe"
            }
        }
        const salt: string = encript.genSaltSync();
        data.user_password = encript.hashSync(user_password, salt); 
        data.pro_code = profile._id;
        data.user_name = user_name
        data.com_id = com_id
        data.user_id_type = idType._id;
        data.user_sexo = gender._id
        const user: UserInterface = await User(data);
        user.save((error:any, product:UserInterface) => {
            if(error){
                return {
                    status:500,
                    message:error.message
                };
            }
        });
        return {
            status:200,
            message:"usuario insertado"
        };
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:error
        }
    }
}

export = insertUserRepository
