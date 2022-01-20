import CompanyInterface from "../../interfaces/companyInterface";
import UserInterface from "../../interfaces/userInterface";
import modelCompany from "../../models/modelCompany";

const {getAuthUser} = require( "../../middleware/verifyToken");
const User = require('../../models/modelUser')


const getCompanyUserRepository = async(user_id:number) =>{

    const {com_id} = getAuthUser();
    
    try {
        const company: CompanyInterface = await modelCompany.findOne({_id:com_id});
        if(!company){
            return {
                status:605,
                message:"compañia no existe"
            };
        }
        let users:UserInterface | UserInterface[];
        if(!user_id){
            users = await User.find({com_id}).populate('pro_code');
        }else{
            users = await User.findOne({com_id, _id:{$eq:user_id}}).populate('pro_code')
        }
        if (users){
            return {status:200, company, message:users}
        }
        
        return {status:602, message:"usuario de compañia no encontrado"}
    } catch (error:any) {
        console.log(error)
        return {
            status:500,
            message:error}
    }
}

export = getCompanyUserRepository;