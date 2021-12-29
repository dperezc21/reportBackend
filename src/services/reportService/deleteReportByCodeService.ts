
import Report from "../../models/modelReport";

const deleteReportByCodeRepository = async(ids:string[]) =>{

    try {
        let reportDeleted:any={};
        if(ids){
            //  for(let id of ids){
            //     report = await Report.findOneAndUpdate({rep_code:id, rep_status:true}, {rep_status:false}, {new:true});
            //     if(report) deleted+=1;
            //     console.log(deleted);
            //  } 
            reportDeleted = await Report.updateMany({rep_code:ids}, {rep_status:false}) 
        }
        console.log(reportDeleted)
        if(reportDeleted.modifiedCount > 0) {
            return {
                status:200,
                message:`reporte(s) eliminados ${reportDeleted.modifiedCount}`
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