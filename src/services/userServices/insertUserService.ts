const User = require('../../models/modelUser');
const Company = require('../../models/modelCompany');
const UserProfile = require('../../models/modelUserProfile');
const encript = require('bcryptjs');

const insertUserRepository = async(dataUser: any) => {
    let {com_id, user_name, user_password, pro_name="user"} = dataUser;
    //console.log("datos de usuario", dataUser)
    try {
        const profile = await UserProfile.findOne({pro_name, pro_status:true});
        if (!profile){
            return {
                status:800,
                message:"perfil de usuario no existe"
            };
        }

        const salt = encript.genSaltSync();
        user_password = encript.hashSync(user_password, salt); 
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
