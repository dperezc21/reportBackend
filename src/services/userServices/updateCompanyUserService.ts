import UserInterface from "../../interfaces/userInterface";

const {getDataUserValid} = require( "../../helpers/helperUser");

const User = require('../../models/modelUser')

const updateCompanyUserRepository = async(dataUser:any) => {
    let {user_id, data} = dataUser;
    try {
        data = await getDataUserValid(data);
        const updateUser: UserInterface = await User.findOneAndUpdate({_id:user_id, user_status:true}, {$set:data}, {new:true});
        if (!updateUser){
            return {
                status:602,
                message:"usuario no actualizado, no existe"
            };
        }
        return {
            status:200,
            message:"usuario actualizado"
        }
    } catch (error) {
        console.log(error)
        return {
            status:500,
            message:error
        }
    }
}


export = updateCompanyUserRepository;
