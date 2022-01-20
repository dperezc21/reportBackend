import CompanyInterface from "../../interfaces/companyInterface";
import UserInterface from "../../interfaces/userInterface";
import modelCompany from "../../models/modelCompany";
import modelUser from "../../models/modelUser";
const {getAuthUser} = require( "../../middleware/verifyToken");


const updateUserStatusService = async(data:any) => {
    const userAuth:UserInterface = getAuthUser();
    try {

        const company: CompanyInterface = await modelCompany.findOne({_id: userAuth.com_id, com_status:true});
        if(!company){
            return {
                status:605,
                message:"compañia no existe"
            };
        }
        let numberUsersUpdated:number = 0;
        for (const key in data) {
            const userUpdated = await modelUser.updateOne({
                $and:[{_id:parseInt(key)}, {_id:{$ne:userAuth._id}}],
                com_id:company._id
            },
            {user_status:data[key]})
            if (userUpdated.modifiedCount>0) numberUsersUpdated+=1;
        }
        return {
            status:200,
            message:`usuarios actualizados ${numberUsersUpdated}`
        }
        
    } catch (error:any) {
        return {
            status:500,
            message:error.message
        }
    }

}

export = updateUserStatusService