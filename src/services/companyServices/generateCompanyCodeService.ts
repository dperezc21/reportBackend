
import companyCode from "../../helpers/generateCompanyCode";
import CompanyInterface from "../../interfaces/companyInterface";
const {getAuthUser} = require( "../../middleware/verifyToken");
const Company = require('../../models/modelCompany')

const generateCompanyCodeRepository = async() =>{
    const {com_id} = getAuthUser();
    try {
        const company: CompanyInterface = await Company.findById({_id:com_id, com_status:true});
        if (!company){
            return {
                status: 605,
                message:"compañia no existe"
            }
        }
        const {com_name} = company; 
        console.log(company);
        const code: string | Error = await companyCode(com_name);
        await Company.findByIdAndUpdate({
            _id:com_id, com_status:true
        }, 
        {com_code:code});
        return {
            status:200,
            code
        }
        
    } catch (error) {
        return {
            status:500,
            message:error
        }
    }
}

export = generateCompanyCodeRepository;