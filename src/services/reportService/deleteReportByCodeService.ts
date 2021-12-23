
const {getAuthUser} = require( "../../middleware/verifyToken");
import Report from "../../models/modelReport";

const deleteReportByCodeRepository = async(ids:[]) =>{

    try {
        let report:any= undefined;
        let deleted:any = 0;
        if(ids){
             for(let id of ids){
                report = await Report.findOneAndUpdate({rep_code:id, rep_status:true}, {rep_status:false}, {new:true});
                if(report) deleted+=1;
                console.log(deleted);
             }  
        }
        console.log(report)
        if(deleted > 0) {
            return {
                status:200,
                message:"reporte(s) eliminados"
            };
        }
        return {
            status:805, 
            message:"reporte(s) no existen"
        }
        
    } catch (error) {
        return {
            status:500,
            message:error
        }

    }
}

export = deleteReportByCodeRepository