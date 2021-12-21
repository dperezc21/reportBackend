import File from "../../models/modelFile";
import Report from "../../models/modelReport";
const {getAuthUser} = require( "../../middleware/verifyToken");

const getReportsRepository = async() =>{
    
    try {
        const {_id } = getAuthUser();
        const reports = await Report.find({user_code:_id, rep_status:true}).limit(10);
        if(!reports){
            return {
                status:805,
                message:"reporte no existe"
            }
        }
        // console.log(reports)
        let list_reports:any = []
        
        for (let report of reports){
            console.log(report.rep_code)
            let archivos = await File.find({rep_code:report.rep_code});
            console.log(archivos)
            list_reports.push({report, archivos});
        }
            
        return {
            status:200,
            list_reports
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