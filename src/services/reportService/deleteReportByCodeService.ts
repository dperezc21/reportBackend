
const {getAuthUser} = require( "../../middleware/verifyToken");
import Report from "../../models/modelReport";

const deleteReportByCodeRepository = async(rep_code:any) =>{

    try {
        const {_id } = getAuthUser();
        const report = await Report.findOneAndUpdate({user_code:_id, rep_code, rep_status:true}, {rep_status:false}, {new:true});
    
        console.log(report)
        if(!report) {
            return {
                status:805,
                message:"reporte no existe"
            };
        }
        return {
            status:200, 
            message:"reporte eliminado"
        }
        
    } catch (error) {
        return {
            status:500,
            message:error
        }

    }
}

export = deleteReportByCodeRepository