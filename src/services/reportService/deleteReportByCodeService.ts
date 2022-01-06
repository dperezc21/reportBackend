
import modelFile from "../../models/modelFile";
import Report from "../../models/modelReport";

const deleteReportByCodeRepository = async(ids:string[]) =>{
    
    try {
        let reportDeleted:any={};
        let filesDeleted: any ={};
        if(ids){ 
            reportDeleted = await Report.updateMany({
                rep_code:ids,
                rep_status:true
            }, {rep_status:false}) 
            filesDeleted = await modelFile.updateMany({rep_code:ids, file_status:true},{file_status:false})
        }
        
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
        console.log(error);
        return {
            status:500,
            message:error
        }

    }
}

export = deleteReportByCodeRepository