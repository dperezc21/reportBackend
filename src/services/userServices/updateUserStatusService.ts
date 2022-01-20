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
       
        
        
            data.forEach(async(element:any) => {
                await modelUser.findOneAndUpdate({
                    $and:[{_id:element.id}, {_id:{$ne:userAuth._id}}],
                    com_id:company._id
                },
                {user_status:element.status}, {new:true})
                
            })
        
       
        
        return {
            status:200
        }
        
    } catch (error:any) {
        return {
            status:500,
            message:error.message
        }
    }

}

export = updateUserStatusService