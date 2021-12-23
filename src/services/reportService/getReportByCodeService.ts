import File from "../../models/modelFile";
import Report from "../../models/modelReport";
const {getAuthUser} = require( "../../middleware/verifyToken");

const getReportByCodeRepository = async(rep_code:any) =>{
    
    try {
        
        const report = await Report.findOne({rep_code, rep_status:true})
                                   .populate('cat_code', ['cat_name'])
                                   .limit(10);
        if(!report){
            return {
                status:805,
                message:"reporte no existe"
            }
        }
        const archivos= await File.find({rep_code});
        return {
            report, archivos
        }
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:error
        }
    }

}

export = getReportByCodeRepository;