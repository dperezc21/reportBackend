import CompanyInterface from "../../interfaces/companyInterface";
import UserInterface from "../../interfaces/userInterface";
const {getAuthUser} = require( "../../middleware/verifyToken");
const Company = require('../../models/modelCompany')
const User = require('../../models/modelUser')

const deleteCompanyUserRepository = async(ids:number[], status:any) =>{
    
    const userAuth:UserInterface = getAuthUser();
    
    try {
        const company: CompanyInterface = await Company.findOne({_id: userAuth.com_id, com_status:true});
        if(!company){
            return {
                status:605,
                message:"compañia no existe"
            };
        }
        let deleted:any = await User.updateMany({
                    $and:[
                        {_id:{ $ne:userAuth._id}},
                        {_id:ids}
                    ],
                    com_id:company._id}, 
                    {user_status:status})
        
        console.log(deleted)

        if (company && deleted.modifiedCount>0){
            return {
                status:200,
                message:`registros actualizados: ${deleted.modifiedCount}`
            };
        }
        return {
            status:200,
            message:"usuario no actualizado"
        }
    } catch (error:any) {
        console.log(error.message);
        return {
            status:500,
            message:error}
    }
}


export = deleteCompanyUserRepository;
