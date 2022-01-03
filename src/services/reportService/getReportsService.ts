import reportInterface from "../../interfaces/reportInterface";
import Report from "../../models/modelReport";
const {getAuthUser} = require( "../../middleware/verifyToken");
const {getInquiryForAdmin} = require( "../../helpers/helperCompany");

const getReportsRepository = async() =>{
    
    try {
        //console.log(getAuthUser())
        const {_id, pro_code, com_id } = getAuthUser();
        let reports: reportInterface[];
        if (pro_code.pro_name == "admin"){
            reports = await getInquiryForAdmin(com_id);
        }else{
            reports = await Report.find({user_code:_id, rep_status:true})
                                  .populate('user_code',['user_name', 'pro_code'])
                                  .populate('cat_code', ['cat_name'])
                                  .limit(10);
        }
        
        if(!reports){
            return {
                status:805,
                message:"no existen reportes"
            }
        }
            
        return {
            status:200,
            reports
        }
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:error
        }
    }

}


export = getReportsRepository;