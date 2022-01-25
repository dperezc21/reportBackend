import UserInterface from "../../interfaces/userInterface";
import UserProfileInterface from "../../interfaces/userProfileInterface";

const User = require('../../models/modelUser');
const UserProfile = require('../../models/modelUserProfile');
const encript = require('bcryptjs');
const {configUser} = require('../../helpers/dataConfig');

const insertUserRepository = async(dataUser: any) => {
    console.log(dataUser)
    let {com_id, user_name, user_password, ...data} = dataUser;
  
    try {
        const profile:UserProfileInterface = await UserProfile.findOne({pro_name:configUser.pro_name, pro_status:true});
        if (!profile){
            return {
                status:800,
                message:"perfil de usuario no existe"
            };
        }
        
        const salt: string = encript.genSaltSync();
        data.user_password = encript.hashSync(user_password, salt); 
        data.pro_code = profile._id;
        data.user_name = user_name
        data.com_id = com_id
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
            message:"user inserted"
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
