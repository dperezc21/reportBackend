import CompanyInterface from "../../interfaces/companyInterface";
import modelCompany from "../../models/modelCompany";
const {getAuthUser} = require( "../../middleware/verifyToken");


const getCompanyCodeRepository = async() => {
    const {com_id} = getAuthUser();

    try {
        const company: CompanyInterface = await modelCompany.findOne({_id:com_id, com_status:true});
        const code: string | Error = company?.com_code;

        return {
            status:200,
            code
        }
    } catch (error:any) {
        console.log(error);
        return {
            status:500,
            message: error
        }
    }
}

export = getCompanyCodeRepository;